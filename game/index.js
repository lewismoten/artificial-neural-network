(() => {

  'use strict';

  let Game = require('octothorpe-xo'),
    lib = require('../lib'),
    game = new Game(),
    networks = new Array(200)
    .fill(0)
    .map(() => new lib.Network({layers: [9, 5, 2]}));

  networks.push({name: 'ai-random', process: () => [Math.random(), Math.random()]});

  networks.push({name: 'ai-random-open', process: (...spots) => {
    let n = Math.floor(Math.random() * spots.filter(s => s === 0).length);
    let index = spots.filter((s, i) => i === n);
    let y = index % 3;
    let x = (index - y) / index;
    return [x + 1, y + 1];
  }});

  networks.push({name: 'ai-first-open', process: (...spots) => {
    let index;
    spots.find((s, i) => {index = i; i === 0});
    let y = index % 3;
    let x = (index - y) / index;
    return [x + 1, y + 1];
  }});

  // TODO: Add ai with full strategy
  // TODO: Setup genetic algorithm
  // TODO: Setup back propogation

  networks.forEach(ann => {

    ann.wins = 0;
    ann.draws = 0;
    ann.losses = 0;
    ann.cheats = 0;
    ann.fitness = 0;
    ann.games = 0;

  });


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
      wins = Math.floor(10000 * (player.wins / count)) / 100,
      losses = Math.floor(10000 * (player.losses / count)) / 100,
      draws = Math.floor(10000 * (player.draws / count)) / 100,
      cheats = Math.floor(10000 * (player.cheats / count)) / 100;

    console.log(`${name} ${player.name || ''} FIT ${player.fitness} WIN ${wins}% LOST: ${losses}% DRAW ${draws}% CHEATS: ${cheats}%`);

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

    if (!game.canMark(x, y)) {

      // Cheater!
      break;

    }

    game.mark(x, y);

  }

  return game;

}

function mapGame() {

  let results = [];
  for (let y = 1; y < 4; y++) {

    for (let x = 1; x < 4; x++) {

      let value = game.markAt(x, y);
      if (value === game.nextMark) {

        results.push(1);

      } else if (value === ' ') {

        results.push(0);

      } else {

        results.push(-1);

      }

    }

  }

  return results;

}

function getMove(player) {

  let output = player.process(...mapGame());
  return {
    x: mapCell(output[0]),
    y: mapCell(output[1])
  };

}

function mapCell(value) {

  if (value < 1 / 3) {

    return 1;

  }

  return value < 2 / 3 ? 2 : 3;

}


  console.log(game.toString());




})();
