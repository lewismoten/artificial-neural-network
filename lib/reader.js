(() => {

  'use strict';

  let flatten = require('array-flatten');

  module.exports = (algorithm) => []
      .concat(flatten(algorithm.input.weights))
      .concat(algorithm.hidden.biases)
      .concat(flatten(algorithm.hidden.weights))
      .concat(algorithm.output.biases);

})();
