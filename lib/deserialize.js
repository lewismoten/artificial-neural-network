(() => {

  'use strict';

  let Neuron = require('./neuron'),
    Link = require('./link');

  module.exports = (data) => {

    let neurons = data.neurons.map(mapNeuron);

    data.links.map(mapLink, neurons);

    return {
      layers: data.layers.map(mapLayer, neurons)
    };

  };

  function mapLayer(data) {

    return {
      name:    data.name,
      neurons: data.neurons.map(id => this.find(n => n.id === id))
    };

  }

  function mapNeuron(data) {

    return new Neuron(data);

  }

  function mapLink(data) {

    data.source = this.find(n => n.id === data.source);
    data.target = this.find(n => n.id === data.target);

    return new Link(data);

  }

})();
