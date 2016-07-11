(() => {

  'use strict';

  let Game = require('octothorpe-xo'),
    lib = require('../lib'),
    networks = new Array(200)
      .fill(0)
      .map(() => new lib.Network({layers: [9, 5, 9]}));

  networks.push(require('./ai-random'));
  networks.push(require('./ai-random-open'));
  networks.push(require('./ai-first-open'));
  networks.push(require('./ai-unbeatable'));

  networks.forEach(ann => {

    ann.wins = 0;
    ann.draws = 0;
    ann.losses = 0;
    ann.cheats = 0;
    ann.fitness = 0;
    ann.games = 0;

  });

  let details;
  networks.forEach(player1 => networks.forEach(player2 => {

    details = runGame(player1, player2);
    calculateFitness(details, true, player1);
    calculateFitness(details, false, player2);

  }));

  console.log(details.toString());

  // best
  let best = networks.reduce((a, b) => a.fitness > b.fitness ? a : b);
  let worst = networks.reduce((a, b) => a.fitness < b.fitness ? a : b);

  logStats('best', best);
  logStats('worst', worst);

  function logStats(name, player) {
    let count = player.games,
      fit = player.fitness,
      wins = getPercent(player.wins / count),
      losses = getPercent(player.losses / count),
      draws = getPercent(player.draws / count),
      cheats = getPercent(player.cheats / count);

    console.log(`${name} ${player.name || ''} FIT ${player.fitness} WIN ${wins} LOST: ${losses} DRAW ${draws} CHEATS: ${cheats}`);

  }
function getPercent(value) {

  return `${Math.floor(1000 * value) / 100}%`;

}

function calculateFitness(details, isPlayer1, player) {

  let fitness = (details.turn - 1) * 1,
    mark = isPlayer1 ? 1 : -1;

  player.games++;

  if (details.hasEnded) {

    if (details.winner === mark) {

      player.wins++;
      fitness += 5;

      // winning in less turns is better
      if (details.turn <= 8) {

        fitness++;

      }

      if (details.turn <= 6) {

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

  let game = new Game();

  while (!game.hasEnded) {

    let player = game.nextMark === 1 ? player1 : player2,
      move = getMove(game, player),
      x = move.x,
      y = move.y;

    if (!game.canMark(x, y)) {

      // Cheater!
      break;

    }

    game.mark(x, y);

  }

  return game;

}

function getInputs(game) {

  let results = [];
  for (let y = 1; y < 4; y++) {

    for (let x = 1; x < 4; x++) {

      results.push(
        getInput(game, x, y)
      );

    }

  }

  return results;

}

function getInput(game, x, y) {

  if (game.canMark(x, y)) {

    // unmarked
    return 0;

  } else if (game.markAt(x, y) === game.nextMark) {

    // my mark
    return 1;

  }

  // opponent mark
  return -1;

}

function getMove(game, player) {

  let outputs = player.process(...getInputs(game)),
    index = getMaxValueIndex(outputs);

  return mapIndexTo2d(3, index);

}

function mapIndexTo2d(width, index) {

  let x = index % width,
    y = (index - x) / width;
  return {x: x, y: y};

}

function getMaxValueIndex(items) {

  let s = items.reduce((max, item, i) => {

    return item > items[max] ? i : max;

  }, 0);

  return s;

}

})();
