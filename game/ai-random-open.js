(() => {

  'use strict';

  module.exports = {
    name:    'ai-random-open',
    process: (...spots) => {

      let open = spots
          .map((v, i) => v === 0 ? i : -1)
          .filter(v => v !== -1),
        openIndex = Math.floor(Math.random() * open.length),
        index = open[openIndex],
        output = new Array(9);

      output.fill(0);
      output[index] = 1;
      return output;

    }
  };

})();
