
const lib = require('./lib');

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
    console.log(`${x} ^ ${y} = ${result}`);

  }

}

// console.log(JSON.stringify(network, null, ' '));
// console.log('result', JSON.stringify(output));
//
// console.log('same copy', output.join(',') === output2.join(','))
