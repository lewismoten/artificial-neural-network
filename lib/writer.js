(() => {

  'use strict';

  module.exports = (algorithm, dna) => {

    let j = 0;

    j = writeWeights(algorithm.input.weights, j, dna);
    j = writeBiases(algorithm.hidden.biases, j, dna);
    j = writeWeights(algorithm.hidden.weights, j, dna);
    j = writeBiases(algorithm.output.biases, j, dna);

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
