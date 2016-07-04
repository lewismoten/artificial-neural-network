(() => {

  'use strict';

  let create = require('./create'),
    reader = require('./reader'),
    writer = require('./writer'),
    runner = require('./runner'),
    learn = require('./learn'),
    Neuron = require('./neuron'),
    Link = require('./link'),
    serialize = require('./serialize'),
    deserialize = require('./deserialize'),
    activators = require('./activators');

  module.exports = {
    create:      create,
    reader:      reader,
    writer:      writer,
    runner:      runner,
    learn:       learn,
    Neuron:      Neuron,
    Link:        Link,
    serialize:   serialize,
    deserialize: deserialize,
    activators:  activators
  };

})();
