(() => {

  'use strict';

  let flatten = require('array-flatten');

  module.exports = (neuron) => []
      .concat(flatten(neuron.input.weights))
      .concat(neuron.hidden.biases)
      .concat(flatten(neuron.hidden.weights))
      .concat(neuron.output.biases);

})();
