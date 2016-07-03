(() => {

  'use strict';

  let softmwax = require('softmax-fn'),
    walker = require('array-walker'),
    inda = require('inda'),
    isUndefined = require("is-undefined");

  module.exports = (network, expectedOutput, learnRate, momentum) => {

    // TODO: Support deep networks
    // TODO: Support activation function specific to layer
    // TODO: Specs
    //
    // Figure out gradients for each layer
    // adjust weights/biases for each layer
    //

    let
      inputLayer = network[0],

      lastLayer = network[network.length - 1],
      lastGradients = lastLayer.values.map(mapGradientSoftmax, {
        expected: expectedOutput
      }),

      hiddenLayer = network[network.length - 2],
      hiddenGradients = hiddenLayer.values.map(mapGradientHtan, {
        expected: lastGradients,
        weights:  hiddenLayer.weights
      });

    if (isUndefined(hiddenLayer.previousWeights)) {

      hiddenLayer.previousWeights =
        inda(0, hiddenLayer.values.length, lastLayer.values.length);

    }

    walker(hiddenLayer.weights, updateHiddenWeights, {
      momentum:  momentum,
      learnRate: learnRate,
      layer: hiddenLayer,
      gradients: hiddenGradients
    });

  };

  function updateHiddenWeights(weight, x, y) {

    let delta = this.learnRate * this.gradients[y] * this.layer.values[x];
    let previousWeight = this.layer.previousWeights[x][y];
    this.layer.weights[x][y] += delta + this.momentum * previousWeight;
    this.layer.previousWeights[x][y] = delta;

  }

  function mapGradientSoftmax(output, index) {

    let expectedOutput = this.expected[index],
      derivative = (1 - expectedOutput) * expectedOutput;

    return derivative * (output - expectedOutput);

  }

  function mapGradientHtan(value, i) {

      let expectedOutput = this.expected,
        weights = this.weights,
        derivative = (1 - value) * (1 + value),
        sum = expectedOutput.reduce(sumByWeights.bind(weights[i]));

      return derivative * sum;

  }

  function sumByWeights(weights, previousValue, currentValue, index) {

      let isFirst = index === 1,
        sum = isFirst ? previousValue * weights[index] : previousValue;

      sum += currentValue * weights[index];

      return sum;

  }

})();
