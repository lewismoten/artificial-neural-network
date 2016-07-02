(() => {

  'use strict';

  require('softmax-fn');

  module.exports = (network, expectedOutput) => {

    // TODO: Support deep networks
    // TODO: Support activation function specific to layer
    // TODO: Specs
    //
    // Figure out gradients for each layer
    // adjust weights/biases for each layer
    //

    let lastLayer = network[network.length - 1],
      lastGradients = lastLayer.values.map(mapGradientSoftmax, {
        expected: expectedOutput
      }),

      hiddenLayer = network[network.length - 2],
      hiddenGradients = hiddenLayer.values.map(mapGradientHtan, {
        expected: lastGradients,
        weights: hiddenLayer.weights
      });

//


  };


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
