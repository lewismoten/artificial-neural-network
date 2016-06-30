(() => {

  'use strict';

  var inda = require('inda');

  module.exports = (...layerSizes) => layerSizes.map((size, i) => {

      let isLast = i === layerSizes.length - 1,
        previousValue, // intentionally undefined
        layer = {
          values: inda(0, size),
          previous: {}
        };

      if (i !== 0) {

        layer.biases = inda(initialValue, size);
        layer.activate = isLast ? 'softmax' : 'htan';
        layer.previous.biases = inda(previousValue, size);

      }

      if (!isLast) {

        let nextSize = layerSizes[i + 1];
        layer.weights = inda(initialValue, size, nextSize);
        layer.previous.weights = inda(previousValue, size, nextSize);

      }

      return layer;

    });

  function initialValue() {

    return Math.random() * 0.02 - 0.01;

  }

})();
