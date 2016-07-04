(() => {

  'use strict';

  let uuid = require('uuid'),
    makeWord = require('make-word'),
    activators = require('./activators');

  module.exports = class Neuron {

    constructor(bias, activation, name) {

      this._id = uuid.v4();
      this._name = name || makeWord(5, 8);
      this._bias = bias;
      this._activation = activation;
      this._inputs = [];
      this._outputs = [];
      this._output = 0;

    }

    get id() {

      return this._id;

    }

    get name() {

      return this._name;

    }

    set value(v) {

      this._output = v;

    }

    get output() {

      return this._output || 0;

    }

    get bias() {

      return this._bias || 0;

    }

    attach(outputNeuron, link) {

      let id = outputNeuron.id;

      if (!this._outputs.some(output => output.id === id)) {

        this._outputs.push(outputNeuron);
        outputNeuron.onAttached(this, link);

        this._outputs.push(outputNeuron);

      }

    }

    onAttached(inputNeuron, link) {

      let id = inputNeuron.id;

      if (!this._inputs.some(input => input.id === id)) {

        this._inputs.push({
          neuron: inputNeuron,
          link:   link
        });

      }

    }

    sum() {

        return this._inputs.reduce(sumInput, 0);

    }

    process() {

      this._output = this.fn(this.sum() + this.bias);
      return this.output;

    }

    get fn() {

      return activators.resolve(this._activation);

    }


    toString() {

      let details = {
        type:       this.constructor.name,
        name:       this.name,
        id:         this.id,
        bias:       this.bias,
        sum:        this.sum(),
        total:      this.bias + this.sum(),
        output:     this.fn(this.bias + this.sum()),
        activation: this._activation,
        inputs:     this._inputs.map(input => {

          return {
            name:   input.neuron.name,
            id:     input.neuron.id,
            output: input.neuron.output,
            weight: input.link.weight || 1,
            input:  input.neuron.output * (input.link.weight || 1)
          };

        })

      };

      return JSON.stringify(details, null, ' ');

    }

  };

  function sumInput(sum, input) {

    return sum + input.neuron.output * (input.link.weight || 1);

  }


})();
