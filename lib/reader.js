(() => {

  'use strict';

  let flatten = require('array-flatten');

  module.exports = (network) => flatten(
    network.map((layer) =>
      (layer.weights || []).concat(layer.biases || [])
    ));

})();
