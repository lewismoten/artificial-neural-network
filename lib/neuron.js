(() => {

  'use strict';

  let uuid = require('uuid'),
    makeWord = require('make-word'),
    getKeyOrDefault = require('get-key-or-default'),
    isFunction = require('is-function');

  module.exports = class Neuron {

    constructor(bias, activation) {

      this.id = uuid.v4();
      this.name = makeWord(5, 8);
      this.bias = bias;
      this.activation = activation;
      this.inputs = [];
      this.outputs = [];
      this.value = 0;

    }

    attach(outputNeuron, link) {

      let id = outputNeuron.id;

      if (!this.outputs.some(output => output.id === id)) {

        this.outputs.push(outputNeuron);
        outputNeuron.onAttached(this, link);

        this.outputs.push(outputNeuron);

      }

    }

    onAttached(inputNeuron, link) {

      let id = inputNeuron.id;

      if (!this.inputs.some(input => input.id === id)) {

        this.inputs.push({
          neuron: inputNeuron,
          link:   link
        });

      }

    }

    sum() {

        return this.inputs.reduce(sumInput, 0);

    }

    process(activators) {

      this.output = this.getActivator(activators)(this.sum() + this.bias);
      return this.output;

    }

    getActivator(activators) {

      return getKeyOrDefault(activators, this.activation, () => 0, isFunction);

    }


    toString() {

      let details = {
        type:       this.constructor.name,
        name:       this.name,
        id:         this.id,
        bias:       this.bias || 0,
        sum:        this.sum(),
        total:      (this.bias || 0) + this.sum(),
        value:      this.getActivator(global)((this.bias || 0) + this.sum()),
        activation: this.activation,
        inputs:     this.inputs.map(input => {

          return {
            name:   input.neuron.name,
            id:     input.neuron.id,
            value:  input.neuron.value,
            weight: input.link.weight || 1,
            output: input.neuron.value * (input.link.weight || 1)
          };

        })

      };

      return JSON.stringify(details, null, ' ');

    }

  };

  function sumInput(sum, input) {

    return sum + input.neuron.value * (input.link.weight || 1);

  }


})();
