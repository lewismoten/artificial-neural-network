(() => {

  'use strict';

  let create = require('./create'),
    reader = require('./reader'),
    writer = require('./writer'),
    runner = require('./runner'),
    learn = require('./learn'),
    Neuron = require('./neuron'),
    activators = require('./activators');

  module.exports = {
    create:     create,
    reader:     reader,
    writer:     writer,
    runner:     runner,
    learn:      learn,
    Neuron:     Neuron,
    activators: activators
  };

})();
