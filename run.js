
var getNeuron = require('./lib/create');
var reader = require('./lib/reader');
var writer = require('./lib/writer');
var runner = require('./lib/runner');

var vv = process.argv.slice(2).map(function(n) { return Number(n);});
var v = vv[0] || 0;

var n = getNeuron(3,4,2);
var n2 = getNeuron(3,4,2);

writer(n2, reader(n));

// console.log('neurons match?', JSON.stringify(n) == JSON.stringify(n2));

n[0].values = [1,2,3];

//console.log(JSON.stringify(n, null, ' '));
console.log('result', JSON.stringify(runner(n)));
