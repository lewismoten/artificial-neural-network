
const lib = require('./lib');
let n = lib.create(2, 3, 2),
  v;

n[0].values = [3.2, 1 / 3];
v = lib.runner(n);

console.log(JSON.stringify(n, null, ' '));
console.log('result', JSON.stringify(v));
