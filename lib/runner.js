(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn'),
    walker = require('array-walker');

  module.exports = (algorithm) => algorithm.reduce(calculation).values;

  function calculation(layer, nextLayer) {

    nextLayer.values = Array.from(nextLayer.biases);

    walker(layer.weights, (weight, index, nextIndex) => {

      nextLayer.values[nextIndex] += layer.values[index] * weight;

    });

    activate(nextLayer);
    return nextLayer;

  }

  function activate(layer) {

    switch (layer.activation) {
      case 'htan':
        layer.values = layer.values.map(htan);
        break;
      case 'softmax':
        layer.values = softmax(layer.values);
        break;
      default:

    }

  }

})();
