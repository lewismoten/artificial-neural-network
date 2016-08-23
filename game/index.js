(() => {

  'use strict';

  let Game = require('octothorpe-xo'),
    lib = require('../lib'),
    elo = require('./elo.js');

  main();

  function main() {

    let networks = new Array(200)
      .fill(0)
      .map(() => new lib.Network({layers: [9, 5, 9]})),
    details;


      networks.push(require('./ai-random'));
      networks.push(require('./ai-random-open'));
      networks.push(require('./ai-first-open'));
      networks.push(require('./ai-unbeatable'));

      networks.forEach(ann => {

        ann.rank = 0;

      });

      networks.forEach(player1 => networks.forEach(player2 => {

        let winner,
          ranks;

        details = runGame(player1, player2);

        winner = getWinner(details);
        ranks = elo(player1.rank, player2.rank, winner);

        // update rank
        player1.rank = ranks[0];
        player2.rank = ranks[1];

      }));

      displayResults(networks);

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
      // We must break or the same player may make the same choice!
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

  function getWinner(game) {

    // determine outcome scores
    if (game.hasEnded) {

      switch (game.winner) {
        case 1:
        case 2:
          return game.winner;
        default:
          return 0;
      }

    }

    // someone has cheated!
    return game.nextMark === 1 ? 2 : 1;

  }

  function compareRanks(a, b) {

    if (a.rank < b.rank) {

      return -1;

    } else if (a.rank === b.rank) {

      return 0;

    }

    return 1;

  }

  function displayResults(networks) {

    networks.sort(compareRanks);
    networks.filter(isEdge).map(showOff);

  }

  function showOff(network) {

    console.log(network.rank, network.name);

  }

  function isEdge(v, i, a) {

    // only the 3 worst and 3 best
    return i < 3 || i > a.length - 4;

  }

})();
