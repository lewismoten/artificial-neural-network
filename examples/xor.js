/*

Takes two inputs.
Each input is either 0 or 1.
It performs an XOR operation through the network.
The result is either 0 or 1.
It is 1 if only one of the inputs is 1.

0 XOR 0 = 0
0 XOR 1 = 1
1 XOR 0 = 1
1 XOR 1 = 0

*/
const lib = require('../lib');

let xor = lib.create(2, 2, 1);

xor[0].weights = [
  [2, -2],
  [2, -2]
];
xor[1].biases = [-1, 3];
xor[1].weights = [
  [2],
  [2]
];
xor[2].biases = [-3];
xor[1].activate = 'htan';
xor[2].activate = 'heaviside';

for (let x = 0; x < 2; x++) {

  for (let y = 0; y < 2; y++) {

    xor[0].values = [x, y];
    let result = lib.runner(xor)[0];
    console.log(`${x} XOR ${y} = ${result}`, test(x, y, result));

  }

}


function test(x, y, result) {

  return result === (x ^ y) ? 'PASS' : 'FAIL';

}
