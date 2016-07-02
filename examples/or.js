/*

Takes two inputs.
Each input is either 0 or 1.
It performs an OR operation through the network.
The result is either 0 or 1.
0 if both inputs are 0, otherwise 1.

0 OR 0 = 0
0 OR 1 = 1
1 OR 0 = 1
1 OR 1 = 1

*/
const lib = require('../lib');

let and = lib.create(2, 1);

and[0].weights = [
  [1],
  [1]
];
and[1].biases = [-1];
and[1].activate = 'heaviside';

for (let x = 0; x < 2; x++) {

  for (let y = 0; y < 2; y++) {

    and[0].values = [x, y];
    let result = lib.runner(and)[0];
    console.log(`${x} OR ${y} = ${result}`);

  }

}
