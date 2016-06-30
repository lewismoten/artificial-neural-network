
const lib = require('./lib');
let network = lib.create(2, 3, 2),
  output,
  output2,
  dna,
  copy,
  input = [3.2, 1 / 3];

network[0].values = input;
output = lib.runner(network);

dna = lib.reader(network);
copy = lib.create(2, 3, 2);
copy[0].values = input;
lib.writer(copy, dna);
output2 = lib.runner(copy);

console.log(JSON.stringify(network, null, ' '));
console.log('result', JSON.stringify(output));

console.log('same copy', output.join(',') === output2.join(','))
