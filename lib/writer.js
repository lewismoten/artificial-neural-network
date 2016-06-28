(() => {

  'use strict';

  module.exports = (neuron, dna) => {

    let j = 0;

    j = writeWeights(neuron.input.weights, j, dna);
    j = writeBiases(neuron.hidden.biases, j, dna);
    j = writeWeights(neuron.hidden.weights, j, dna);
    j = writeBiases(neuron.output.biases, j, dna);

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
