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

    walker(layer.weights, (weight, index, nextIndex) => {

      nextLayer.values[nextIndex] += layer.values[index] * weight;

    });

    activate(nextLayer);
    return nextLayer;

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
