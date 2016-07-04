(() => {

  'use strict';

  let uuid = require('uuid');

  module.exports = class Neuron {

    constructor(bias, activationCallback) {

      this.id = uuid.v4();
      this.bias = bias;
      this.activate = activationCallback;
      this.inputs = [];
      this.outputs = [];
      this.value = 0;

    }

    tick() {

      // change state (inputs and signal blocked)
      // turn off or reduce signal?
      // pulsee?
      // signal strethened?
      // signal reaches another output, stops going to first...

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

    process() {

      this.output = this.activate(this.sum() + this.bias);
      return this.output;

    }

    toString() {

      let details = `Neuron\n`;
      let inputs = this.inputs;
      let bias = (this.bias || 0);

      details += `id: ${this.id}\n`;
      details += `Number of inputs: ${inputs.length}\n`;

      inputs.forEach((input, index) => {

        let value = input.neuron.value,
          weight = input.link.weight || 1;

        details += `\t${index}: ${input.neuron.id}\n`;
        details += `\t\tvalue:    ${value}\n`;
        details += `\t\tweight: * ${weight}\n`;
        details += `\t\t        = ${value * weight}\n`;

      });

      details += `Sum: ${this.sum()}\n`;
      details += `Bias: ${bias}\n`;
      details += `Total: ${this.sum() + bias}\n`;
      details += `activation: ${this.activate}\n`;
      details += `Value: ${this.activate(this.sum() + bias)}`;

      return details;

    }

  };

  function sumInput(sum, input) {

    return sum + input.neuron.value * (input.link.weight || 1);

  }

})();
