(() => {

  'use strict';

  module.exports = (network) => {

    let neurons = network.layers.reduce(mergeNeurons, []),
      links = neurons
        .map(mapLinks)
        .reduce(mergeArrays, [])
        .filter(uniqueId);

    return {

      layers:  network.layers.map(mapLayer),
      neurons: neurons.map(mapNeuron),
      links:   links

    };

  };

  function mergeArrays(a, b) {

    return a.concat(b);

  }

  function mergeNeurons(neurons, layer) {

    neurons.push(...layer.neurons);
    return neurons;

  }

  function mapLayer(layer) {

    return {
      name:    layer.name,
      neurons: layer.neurons.map(n => n.id)
    };

  }

  function mapLinks(neuron) {

    return neuron.inputs.map(mapLink)
      .concat(neuron.outputs.map(mapLink));

  }

  function mapLink(link) {

    return {
      id:     link.id,
      weight: link.weight,
      source: link.source.id,
      target: link.target.id
    };

  }

  function uniqueId(item, index, source) {

    return source.some((previousItem, previousIndex) =>

      previousItem.id === item.id && previousIndex < index

    );

  }

  function mapNeuron(neuron) {

    return {
      id:         neuron.id,
      name:       neuron.name,
      bias:       neuron.bias,
      activation: neuron.activation
    };

  }

})();
