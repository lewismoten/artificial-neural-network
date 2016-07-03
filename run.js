
const lib = require('./lib');

let xor = lib.create(2, 2, 1),
  LearningRate = 0.03,
  momentum = 0.1,
  input = [1, 1],
  expectedOutput = [1];

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

xor[0].values = input;
let result = lib.runner(xor)[0];
lib.learn(xor, expectedOutput, LearningRate, momentum);

// console.log(JSON.stringify(network, null, ' '));
// console.log('result', JSON.stringify(output));
//
// console.log('same copy', output.join(',') === output2.join(','))
