(() => {

  'use strict';

  let walker = require('array-walker');

  module.exports = (network, dna) => {

    let j = 0;

    network.map((layer) => {

      if (typeof layer.weights !== 'undefined') {

        j = writeWeights(layer.weights, j, dna);

      }

      if (typeof layer.biases !== 'undefined') {

        j = writeBiases(layer.biases, j, dna);

      }

    });

  };

  function writeWeights(target, offset, data) {

    target.map((v, x) => {

      target[x].map((vv, y) => {

        target[x][y] = data[offset++];

      });

    });

    return offset;

  }

  function writeBiases(target, offset, data) {

    target.map((v, x) => {

      target[x] = data[offset++];

    });

    return offset;

  }

})();
