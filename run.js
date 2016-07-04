
const lib = require('./lib');

let activation = 'heaviside',
  inputX = new lib.Neuron(0, 'value', 'X'),
  inputY = new lib.Neuron(0, 'value', 'Y'),
  hiddenOr = new lib.Neuron(-0.99999, activation, 'OR'),
  hiddenAnd = new lib.Neuron(-1.00001, activation, 'AND'),
  outputXor = new lib.Neuron(-0.5, activation, 'XOR');

inputX.attach(hiddenOr, {weight: 2});
inputY.attach(hiddenOr, {weight: 2});

inputX.attach(hiddenAnd, {weight: 1});
inputY.attach(hiddenAnd, {weight: 1});

hiddenOr.attach(outputXor, {weight: 1});
hiddenAnd.attach(outputXor, {weight: -1});

for (let x = 0; x < 2; x++) {

  for (let y = 0; y < 2; y++) {

    inputX.value = x;
    inputY.value = y;

    console.log(`inputs [${x}, ${y}]`);

    hiddenOr.process();
    console.log(`\tOR = ${hiddenOr.output}`);
    //console.log(`${hiddenOr}`);

    hiddenAnd.process();
    console.log(`\tAND = ${hiddenAnd.output}`);

    outputXor.process();
    console.log(`\tXOR = ${outputXor.output}\n`);

  //  console.log(`a neuron ${outputXor}`);

  }

}
