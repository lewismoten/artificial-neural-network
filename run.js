
var sigmoid = require('sigmoid');
var htan = require('htan');
var softmax = require('softmax-fn');
var heaviside = require('heaviside');
var getNeuron = require('./lib/neuron');

var reader = require('./lib/neuron-reader');
var writer = require('./lib/neuron-writer');
var runner = require('./lib/algorithm-runner');



var vv = process.argv.slice(2).map(function(n) { return Number(n);});
var v = vv[0] || 0;

// console.log('value', v);
// console.log('Sigmoid', sigmoid(v));
// console.log('Sigmoid derivitive', sigmoid(v, true));
// console.log('Heaviside step', heaviside(v));
// console.log('Hyperbolic Tangent', htan(v));
// console.log();
// console.log('values', JSON.stringify(vv));
// console.log('Softmax', softmax(vv));

//console.log(sigmoid(v));
var n = getNeuron(3,4,2);
var n2 = getNeuron(3,4,2);

writer(n2, reader(n));

//console.log('neurons match?', JSON.stringify(n) == JSON.stringify(n2));

n.input.values = [1,2,3];
runner(n);

console.log(JSON.stringify(n, null, ' '));
console.log('result', JSON.stringify(n.output.values));
