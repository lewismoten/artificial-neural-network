(() => {

  'use strict';

  let uuid = require('uuid');

  module.exports = class Link {

    constructor(sourceNeuron, targetNeuron, weight) {

      this._id = uuid.v4();
      this._weight = weight;
      this._source = sourceNeuron;
      this._target = targetNeuron;

      sourceNeuron.addOutput(this);
      targetNeuron.addInput(this);

    }

    get id() {

      return this._id;

    }

    get name() {

      return `${this._source.name} → ${this._target.name}`;

    }

    get output() {

      return this.weight * this._source.output;

    }

    get input() {

      return this._source.output;

    }

    get weight() {

      return this._weight || 1;

    }

    details(showCalculations) {

      let result = {
          type:   this.constructor.name,
          name:   this.name,
          id:     this.id,
          weight: this.weight
        };

      if (showCalculations) {

        result.input = this.input;
        result.output = this.output;

      }

      return result;

    }

    toString() {

      return JSON.stringify(this.details(false), null, ' ');

    }

  };


})();
