(() => {

  'use strict';

  module.exports = class Game {

    constructor() {

      this.reset();

    }

    reset() {

      this._grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    }

    markAt(x, y) {

      return this._grid[indexOf(x, y)];

    }

    isAvailable(x, y) {

      return this.markAt(x, y) === 0;

    }

    get hasEnded() {

      return this.turns === 9 ||
        this.winner !== 0;

    }

    get turns() {

      return this._grid.filter(v => v !== 0).length;

    }

    get nextMark() {

      return this.turns % 2 === 1 ? -1 : 1;

    }

    get winner() {

      let mark = 0,
        wins = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [1, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 5],
          [2, 4, 6]
        ];

      wins.some(win => {

        mark = triplicate(win.map(i => this._grid[i]));
        return mark !== 0;

      });

      return mark;

    }

    take(x, y) {

      if (!this.isAvailable(x, y)) {

        return;

      }

      this._grid[indexOf(x, y)] = this.nextMark;

    }

    stringAt(x, y) {

      switch (this.markAt(x, y)) {
        case -1:
          return 'O';
        case 1:
          return 'X';
        default:
          return ' ';
      }

    }

    toString() {

      return `
 ${this.stringAt(0, 0)} | ${this.stringAt(1, 0)} | ${this.stringAt(2, 0)}
---+---+---
 ${this.stringAt(0, 1)} | ${this.stringAt(1, 1)} | ${this.stringAt(2, 1)}
---+---+---
 ${this.stringAt(0, 2)} | ${this.stringAt(1, 2)} | ${this.stringAt(2, 2)}
`;

    }

  };

  function triplicate(items) {

    let item = items[0];

    if (items[1] === item && items[2] === item) {

      return item;

    }

    return 0;

  }

  function indexOf(x, y) {

    return x * 3 + y;

  }

})();
