(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn'),
    sigmoid = require('sigmoid'),
    heaviside = require('heaviside'),
    walker = require('array-walker');

  module.exports = (network) => network.reduce(calculation).values;

  function calculation(layer, nextLayer) {

    nextLayer.values = Array.from(nextLayer.biases);

    transferAndSum(layer, nextLayer);

    activate(nextLayer);

    return nextLayer;

  }

  function transferAndSum(source, target) {

    walker(source.weights, (weight, index, nextIndex) => {

      target.values[nextIndex] += source.values[index] * weight;

    });

  }

  function activate(layer) {

    switch (layer.activate) {
      case 'htan':
        layer.values = layer.values.map(htan);
        break;
      case 'sigmoid':
        layer.values = layer.values.map(sigmoid);
        break;
      case 'heaviside':
        layer.values = layer.values.map(heaviside);
        break;
      case 'softmax':
        layer.values = softmax(layer.values);
        break;
      case '':
        break;
      default:
        console.log('unknown activation', layer.activate);

    }

  }

})();
