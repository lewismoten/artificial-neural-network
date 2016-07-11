(() => {

  'use strict';

  module.exports = {
    name:    'ai-random',
    process: () => {

      let output = Array(9).fill(0);

      output[Math.floor(Math.random() * 9)] = 1;
      return output;

    }
  };

})();
