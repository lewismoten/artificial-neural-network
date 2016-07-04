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

    addInput(link) {

      if (!this._inputs.some(input => input.id === link.id)) {

        this._inputs.push(link);

      }

    }

    addOutput(link) {

      if (!this._outputs.some(output => output.id === link.id)) {

        this._outputs.push(link);

      }

    }

    sum() {

      if (this._inputs.length === 0) {

        // we are an input node... input is output
        return this.output;

      }

      return this._inputs.reduce((total, neuron) => total + neuron.output, 0);

    }

    process() {

      this._output = this.fn(this.sum() + this.bias);
      return this.output;

    }

    get fn() {

      return activators.resolve(this._activation);

    }

    details(showCalculations) {

      let result = {
        type:       this.constructor.name,
        name:       this.name,
        id:         this.id,
        bias:       this.bias,
        activation: this._activation,
        inputs:     this._inputs.map(link => link.details(showCalculations)),
        outputs:    this._outputs.map(link => link.details(showCalculations))
      };

      if (showCalculations) {

        result.sum = this.sum();
        result.biasedSum = result.sum + this.bias;
        result.output = this.fn(result.biasedSum);

      }

      return result;

    }

    toString() {

      return JSON.stringify(this.details(false), null, ' ');

    }

  };

})();
