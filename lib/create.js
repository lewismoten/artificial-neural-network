(() => {

  'use strict';

  var inda = require('inda');

  module.exports = (...layerSizes) => layerSizes.map((size, i) => {

      let layer = {
        values: inda(0, size)
      };

      if (i !== 0) {

        layer.biases = inda(initialValue, size);

      }

      if (i !== layerSizes.length - 1) {

        let nextSize = layerSizes[i + 1];
        layer.weights = inda(initialValue, size, nextSize);

      }

      return layer;

    });

  function initialValue() {

    return Math.random() * 0.02 - 0.01;

  }

})();
