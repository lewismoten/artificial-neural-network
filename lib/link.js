(() => {

  'use strict';

  let uuid = require('uuid'),
    makeWord = require('make-word');

  module.exports = class Link {

    constructor(sourceNeuron, targetNeuron, weight, name) {

      this._id = uuid.v4();
      this._name = name || makeWord(5, 8);
      this._weight = weight;
      this._source = sourceNeuron;
      this._target = targetNeuron;

      sourceNeuron.attach(this);
      targetNeuron.onAttached(this);

    }

    get id() {

      return this._id;

    }

    get name() {

      return this._name;

    }

    get output() {

      return this.weight * this.input;

    }

    get weight() {

      return this._weight || 1;

    }

    get input() {

      return this._input || 0;

    }

    set input(value) {

      this._input = value;

    }

  };


})();
