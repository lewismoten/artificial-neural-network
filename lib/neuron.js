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

      let details = `Neuron\n`,
        inputs = this.inputs,
        bias = this.bias || 0,
        sum = this.sum(),
        total = sum + bias,
        fn = this.getActivator(global);

      details += `id: ${this.id} (${this.name})\n`;
      details += `Number of inputs: ${inputs.length}\n`;

      inputs.forEach((input, index) => {

        let name = input.neuron.name,
          value = input.neuron.value,
          weight = input.link.weight || 1;

        details += `\t${index}: ${input.neuron.id} (${name})\n`;
        details += `\t\tvalue:    ${value}\n`;
        details += `\t\tweight: * ${weight}\n`;
        details += `\t\t        = ${value * weight}\n`;

      });

      details += `Sum: ${sum}\n`;
      details += `Bias: ${bias}\n`;
      details += `Total: ${total}\n`;
      details += `Activation: ${this.activation}\n`;
      details += `Value: ${fn(total)}`;


      return details;

    }

  };

  function sumInput(sum, input) {

    return sum + input.neuron.value * (input.link.weight || 1);

  }


})();
