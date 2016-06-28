(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn');

  module.exports = (algorithm) => algorithm.reduce(

      (layer, nextLayer, layerKey) => {

        runLayer(layer, nextLayer);

        if (layerKey === algorithm.length - 1) {

          nextLayer.values = softmax(nextLayer.values);

        } else {

          nextLayer.values = nextLayer.values.map(htan);

        }

        return nextLayer;

    }).values;


  function runLayer(from, to) {

    let inputs = from.values,
      weights = from.weights;

    to.values = Array.from(to.biases);

    weights.map((point, inputKe) => {

      point.map((weight, outputKey) => {

        to.values[outputKey] += inputs[inputKe] * weight;

      });

    });

  }


})();
