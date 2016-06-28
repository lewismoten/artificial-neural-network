(() => {

  'use strict';

  var inda = require('inda');

  module.exports = (inputCount, hiddenCount, outputCount) => {

    let neuron = {
      input: {
        values:  inda(0, inputCount),
        weights: inda(initialWeight, inputCount, hiddenCount)
      },
      hidden: {
        values:  inda(0, hiddenCount),
        weights: inda(initialWeight, hiddenCount, outputCount),
        biases:  inda(initialWeight, hiddenCount)
      },
      output: {
        values: inda(0, outputCount),
        biases: inda(initialWeight, outputCount)
      }
    };

    return neuron;

  };

  function initialWeight() {

    return Math.random() * 0.02 - 0.01;

  }

})();
