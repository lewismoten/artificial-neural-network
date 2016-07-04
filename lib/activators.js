(() => {

  'use strict';

  let getKeyOrDefault = require('get-key-or-default'),
    isFunction = require('is-function'),
    resources = {};

  module.exports = {

    register(name, value) {

      resources[name] = value;

    },

    resolve(name) {

      return getKeyOrDefault(resources, name, () => 0, isFunction);

    }

  };

})();
