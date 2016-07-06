(() => {

  'use strict';

  let Game = require('./game'),
    lib = require('../lib'),
    game = new Game();

  let networks = new Array(200)
    .fill(0)
    .map(() => {
      let ann = new lib.Network({layers: [9, 5, 2]});

      ann.wins = 0;
      ann.draws = 0;
      ann.losses = 0;
      ann.cheats = 0;
      ann.fitness = 0;
      ann.games = 0;

      return ann;

    }
  );


  // play each network against all others and itself.
  // all networks will play each other twice - once as the first player, and as second player
  //
  // TODO: play against random (player 1 / player 2)
  // TODO: play against non-losing strategy (player 1 / player 2)
  // TODO: play against strategy - take first open

  networks.forEach(player1 => networks.forEach(player2 => {

    let details = runGame(player1, player2);
    calculateFitness(details, true, player1);
    calculateFitness(details, false, player2);

  }));

  // best
  let best = networks.reduce((a, b) => a.fitness > b.fitness ? a : b);
  let worst = networks.reduce((a, b) => a.fitness < b.fitness ? a : b);

  logStats('best', best);
  logStats('worst', worst);

  function logStats(name, player) {
    let count = player.games,
      fit = Math.floor(player.fitness * 10) / 10,
      wins = Math.floor(1000 * (player.wins / count)) / 10,
      losses = Math.floor(1000 * (player.losses / count)) / 10,
      draws = Math.floor(1000 * (player.draws / count)) / 10,
      cheats = Math.floor(1000 * (player.cheats / count)) / 10;

    console.log(`${name} FIT ${fit} WIN ${wins}% LOST: ${losses}% DRAW ${draws}% CHEATS: ${cheats}%`);

  }

function calculateFitness(details, isPlayer1, player) {

  let fitness = (details.turns - 1) * 1,
    mark = isPlayer1 ? 1 : -1;

  player.games++;

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
