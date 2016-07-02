/*

Takes two inputs.
Each input is either 0 or 1.
It performs an AND operation through the network.
The result is either 0 or 1.
It is 1 if only if both inputs is 1.

0 AND 0 = 0
0 AND 1 = 0
1 AND 0 = 0
1 AND 1 = 1

*/
const lib = require('../lib');

let and = lib.create(2, 1);

and[0].weights = [
  [1],
  [1]
];
and[1].biases = [-1.000000001];
and[1].activate = 'heaviside';

for (let x = 0; x < 2; x++) {

  for (let y = 0; y < 2; y++) {

    and[0].values = [x, y];
    let result = lib.runner(and)[0];
    console.log(`${x} AND ${y} = ${result}`);

  }

}
