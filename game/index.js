(() => {

  'use strict';

  let Game = require('./game'),
    lib = require('../lib'),

    game = new Game();

  let networks = new Array(100)
    .fill(0)
    .map(() => {
      let ann = new lib.Network({layers: [9, 5, 2]});

      ann.wins = 0;
      ann.draws = 0;
      ann.losses = 0;
      ann.cheats = 0;
      ann.fitness = 0;

      return ann;

    }
  );


  // play each network against all others and itself.
  // all networks will play each other twice - once as the first player, and as second player

  networks.forEach(player1 => networks.forEach(player2 => {

    let details = runGame(player1, player2);
    calculateFitness(details, true, player1);
    calculateFitness(details, false, player2);

  }));

  // best
  let best = networks.reduce((a, b) => a.fitness > b.fitness ? a : b);
  let worst = networks.reduce((a, b) => a.fitness < b.fitness ? a : b);

  console.log(`best: FIT ${best.fitness} WIN ${best.wins} LOSS: ${best.losses} DRAW ${best.draws} CHEATS: ${best.cheats}`)
  console.log(`worst: FIT ${worst.fitness} WIN ${worst.wins} LOSS: ${worst.losses} DRAW ${worst.draws} CHEATS: ${worst.cheats}`)

function calculateFitness(details, isPlayer1, player) {

  let fitness = (details.turns - 1) * 1,
    mark = isPlayer1 ? 1 : -1;

  if (details.hasEnded) {

    if (details.winner === mark) {

      player.wins++;
      fitness += 2;

      // winning in less turns is better
      if (details.turns <= 8) {

        fitness++;

      }

      if (details.turns <= 6) {

        fitness += 2;

      }


    } else if (details.winner === 0) {

      // draw
      player.draws++;
      fitness++;

    } else {

      player.losses++;
      fitness--;

    }


  } else if (details.nextMark === mark) {

    // cheater!
    player.cheats++;
    fitness -= 3;

  }

  if (fitness < 0) {

    fitness = 0;

  }

  fitness /= 13;
  player.fitness += fitness;

}

function runGame(player1, player2) {

  while (!game.hasEnded) {

    let player = game.nextMark === 1 ? player1 : player2,
      move = getMove(player),
      x = move.x,
      y = move.y;

    if (!game.isAvailable(x, y)) {

      // Cheater!
      break;

    }

    game.take(x, y);

  }

  return game;

}

function getMove(player) {

  let output = player.process(...game.board);
  return {
    x: mapCell(output[0]),
    y: mapCell(output[1])
  };

}

function mapCell(value) {

  if (value < 1 / 3) {

    return 0;

  }

  return value < 2 / 3 ? 1 : 2;

}


  console.log(game.toString());

  function ai2000() {

    return Math.floor(Math.random() * 3);

  }


})();
