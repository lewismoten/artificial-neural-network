(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn');

  module.exports = (algorithm) => {

    runLayer(algorithm.input, algorithm.hidden);
    algorithm.hidden.values = algorithm.hidden.values.map(htan);
    runLayer(algorithm.hidden, algorithm.output);
    algorithm.output.values = softmax(algorithm.output.values);

  };

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
