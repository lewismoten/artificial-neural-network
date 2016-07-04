(() => {

  'use strict';

  let getKeyOrDefault = require('get-key-or-default'),
    isFunction = require('is-function'),
    htan = require('htan'),
    heaviside = require('heaviside'),
    resources = {},
    activators = {

      register(name, value) {

        resources[name] = value;

      },

      resolve(name) {

        return getKeyOrDefault(resources, name, () => 0, isFunction);

      }

    };

  activators.register('value', v => v);
  activators.register('htan', htan);
  activators.register('heaviside', heaviside);

  module.exports = activators;

})();
