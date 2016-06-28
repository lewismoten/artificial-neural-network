(() => {

  'use strict';

  let htan = require('htan'),
    softmax = require('softmax-fn');



    nextLayer.values = Array.from(nextLayer.biases);
    applyWeights(layer.values, layer.weights, nextLayer.values);
    activate(nextLayer);
    return nextLayer;

  }

  function applyWeights(sources, weights, targets) {

    weights.map((point, sourceKey) => {

      point.map((weight, targetKey) => {

        targets[targetKey] += sources[sourceKey] * weight;

      });

    });

  }

  function activate(layer) {

    switch (layer.activation) {
      case 'htan':
        layer.values = layer.values.map(htan);
        break;
      case 'softmax':
        layer.values = softmax(layer.values);
        break;
      default:

    }

  }

})();
