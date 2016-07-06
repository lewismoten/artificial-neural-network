(() => {

  'use strict';

  let Neuron = require('./neuron'),
    Link = require('./link'),
    randomJs = require('random-js'),
    random = randomJs();

  module.exports = class Network {

    constructor({
      layers: layers
    }) {

      this._layers = layers.map(createLayer);
      this._layers.reduce(linkNeurons);

    }

    get layers() {

      return this._layers;

    }

    process(...inputs) {

      this._layers[0].neurons.forEach((neuron, i) => {

        neuron.value = inputs[i];

      });

      this._layers.forEach(layer => {

        layer.neurons.forEach(neuron => {

          neuron.process();

        });

      });

      return getLast(this._layers).neurons.map(neuron => neuron.output);

    }

  };

  function getLast(items) {

    return items[items.length - 1];

  }

  function linkNeurons(previousLayer, currentLayer) {

    previousLayer.neurons.map(previousNeuron =>
      currentLayer.neurons.map(
        currentNeuron => new Link({
          source: previousNeuron,
          target: currentNeuron,
          weight: random.real(-10, 10)
        })
      )
    );

    return currentLayer;

  }

  function createLayer(neuronCount, index, {length: totalLayers}) {

      return {
        name:    layerName(index, totalLayers),
        neurons: generateNeurons(neuronCount)
      };

  }

  function generateNeurons(count) {

    return new Array(count).fill(0).map(() => new Neuron({
      bias: random.real(-1, 1)
    }));

  }

  function layerName(index, count) {

    if (index === 0) {

      return 'Input Layer';

    }

    if (index === count - 1) {

      return 'Output Layer';

    }

    return `Hidden Layer ${index}`;

  }


})();
