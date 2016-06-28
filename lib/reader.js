(() => {

  'use strict';

  let flatten = require('array-flatten');

  module.exports = (algorithm) => flatten(
    algorithm.map((layer) =>
      (layer.weights || []).concat(layer.biases || [])
    ));

})();
