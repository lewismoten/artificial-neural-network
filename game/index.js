(() => {

  'use strict';

  let Game = require('./game'),
    game = new Game();

  while (!game.hasEnded) {

    let x = ai2000(),
      y = ai2000();

    while (!game.isAvailable(x, y)) {

      x = ai2000();
      y = ai2000();

    }

    game.take(x, y);


  }

  console.log(game.toString());

  function ai2000() {

    return Math.floor(Math.random() * 3);

  }


})();
