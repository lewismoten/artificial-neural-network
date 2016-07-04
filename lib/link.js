(() => {

  'use strict';

  let uuid = require('uuid');

  module.exports = class Link {

    constructor(configuration) {

      this._id = configuration.id || uuid.v4();
      this._weight = configuration.weight;
      this._source = configuration.source;
      this._target = configuration.target;

      configuration.source.addOutput(this);
      configuration.target.addInput(this);

    }

    get id() {

      return this._id;

    }

    get name() {

      return `${this._source.name} → ${this._target.name}`;

    }

    get output() {

      return this.weight * this.source.output;

    }

    get input() {

      return this.source.output;

    }

    get weight() {

      return this._weight || 1;

    }

    get source() {

      return this._source;

    }

    get target() {

      return this._target;

    }

    serialize(showCalculations) {

      let result = {
          type:   this.constructor.name,
          name:   this.name,
          id:     this.id,
          weight: this.weight,
          source: {
            id: this.source.id
          },
          target: {
            id: this.target.id
          }
        };

      if (showCalculations) {

        result.input = this.input;
        result.output = this.output;

      }

      return result;

    }

    toString() {

      return JSON.stringify(this.serialize(false), null, ' ');

    }

  };


})();
