(() => {

  'use strict';

  module.exports = (inputCount, hiddenCount, outputCount) => {

    let neuron = {
      input: {
        values:  initializedArray(0, inputCount),
        weights: initializedArray(initialWeight, inputCount, hiddenCount)
      },
      hidden: {
        values:  initializedArray(0, hiddenCount),
        weights: initializedArray(initialWeight, hiddenCount, outputCount),
        biases:  initializedArray(initialWeight, hiddenCount)
      },
      output: {
        values: initializedArray(0, outputCount),
        biases: initializedArray(initialWeight, outputCount)
      }
    };

    return neuron;

  };

  function initialWeight() {

    return Math.random() * 0.02 - 0.01;

  }

  function initializedArray(value, count, ...dimensions) {

    const result = [];

    for (let i = 0; i < count; i++) {

      if (dimensions.length > 0) {

        result[i] = initializedArray(value, ...dimensions);

      } else {

        result[i] = typeof value === 'function' ? value() : value;

      }

    }

    return result;

  }

})();
