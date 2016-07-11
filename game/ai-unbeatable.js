(() => {

  'use strict';

  let decisions = [
      moveToWin,
      block,
      fork,
      blockPotentialFork,
      center,
      oppositeCorner,
      emptyCorner,
      emptySide
    ],
    wins = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
      [6, 4, 2]
    ];

  module.exports = {
    name:    'ai-unbeatable',
    process: (...spots) => {

      let decision = decisions.find(strategy => {

        return strategy(spots) !== -1;

      });

      let i = decision(spots);

      let outputs = new Array(9).fill(0);
      outputs[i] = 1;
      return outputs;

    }
  };

  function emptySide(spots) {

    return [1, 3, 5, 7].reduce((move, index) =>
      spots[index] === 0 ? index : move, -1);

  }

  function emptyCorner(spots) {

    return [0, 2, 6, 8].reduce((move, index) =>
      spots[index] === 0 ? index : move, -1);

  }

  function oppositeCorner(spots) {

    return [[0, 8], [2, 6], [6, 2], [8, 0]].reduce((move, pair) =>
      spots[pair[0]] === 0 && spots[pair[1]] === -1 ? pair[0] : move, -1);

  }

  function center(spots) {

    return spots[4] === 0 ? 4 : -1;

  }

  function moveToWin(spots) {

    return wins.reduce((move, win) => {

      if (move !== -1) {

        return move;

      }

      if (win.find(v => spots[v] === -1)) {

        return move;

      }

      if (win.reduce((sum, v) => sum + spots[v], 0) === 2) {

        return win.find(v => spots[v] === 0);

      }

      return -1;

    }, -1);

  }

  function block(spots) {

    return wins.reduce((move, win) => {

      if (move !== -1) {

        return move;

      }

      if (win.find(v => spots[v] === 1)) {

        return move;

      }

      if (win.reduce((sum, v) => sum + spots[v], 0) === -2) {

        return win.find(v => spots[v] === 0);

      }

      return -1;

    }, -1);

  }

  function fork(spots) {

  }


  function blockPotentialFork(spots) {

    return -1;

  }

})();
