(function iife() {

  'use strict';

  const hindsightPrediction = [
    // draw (both won)
    [0.5, 0.5],
    // player 1
    [1, 0],
    // player 2
    [0, 1]
  ],

  maxChange = 10;

  module.exports = getNewRanks;

  function getNewRanks(rank1, rank2, winner) {

    let hindsightChance = hindsightPrediction[winner],
      winChance = [
      getPrediction(rank1, rank2),
      getPrediction(rank2, rank1)
    ];

    return [
      rank1 + maxChange * (hindsightChance[0] - winChance[0]),
      rank2 + maxChange * (hindsightChance[1] - winChance[1])
    ];

  }

  function getPrediction(rank1, rank2) {

    return 1 / (1 + Math.pow(10, (rank2 - rank1) / 400));

  }

}());
