(() => {

  'use strict';

  let walker = require('array-walker');

  module.exports = (algorithm, dna) => {

    let j = 0;

    algorithm.map((layer) => {

      if (typeof layer.weights !== 'undefined') {

        walker(layer.weights, (weight, x, y) => {

          layer.previous.weights[x][y] = weight;

        });

        j = writeWeights(layer.weights, j, dna);

      }

      if (typeof layer.biases !== 'undefined') {

        layer.previous.biases = layer.biases.slice(0);
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
