(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn');

  module.exports = (algorithm) => algorithm.reduce(calculation).values;

  function calculation(layer, nextLayer) {

    nextLayer.values = Array.from(nextLayer.biases);

    multidimensionalMap(layer.weights, (weight, x, y) => {

      nextLayer.values[y] += layer.values[x] * weight;

    });

    activate(nextLayer);
    return nextLayer;

  }

  function multidimensionalMap(items, callback, ...keys) {

    items.forEach((value, key) => {

      if (Array.isArray(value)) {

        multidimensionalMap(value, callback, key, ...keys);

      } else {

        callback(value, ...keys);

      }

    });

  }

  function applyWeights(sources, weights, targets) {

    weights.forEach((point, sourceKey) => {

      point.forEach((weight, targetKey) => {

        targets[targetKey] += sources[sourceKey] * weight;

      });

    });

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
