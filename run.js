var sigmoid = require('./src/sigmoid.js');
var heavsideStep = require('./src/heavside-step.js');
var hyperbolicTangent = require('./src/hyperbolic-tangent.js');
var softmax = require('./src/softmax.js');

var vv = process.argv.slice(2).map(function(n) { return Number(n);});
var v = vv[0] || 0;

console.log('value', v);
console.log('Sigmoid', sigmoid(v));
console.log('Sigmoid derivitive', sigmoid(v, true));
console.log('Heavside step', heavsideStep(v));
console.log('Hyperbolic Tangent', hyperbolicTangent(v));
console.log();
console.log('values', JSON.stringify(vv));
console.log('Softmax', softmax(vv));
