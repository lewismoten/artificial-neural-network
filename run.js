
var sigmoid = require('sigmoid');
var htan = require('htan');
var softmax = require('softmax-fn');
var heaviside = require('heaviside');
var getNeuron = require('./lib/neuron');

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
console.log(n.toString());
