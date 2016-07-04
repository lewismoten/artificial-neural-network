
const lib = require('./lib');

// TODO:
// build network that can quickly setup a new network
// let network = new lib.Network(3, 4, 2);
// let output = network.process(0, 1);
//
// same for layer
// layer = new lib.Layer()
// layer.process();
//
// back-propagation
//

let save = require('./examples/xor.json');
let network =
  lib.deserialize(
    lib.serialize(
      lib.deserialize(save)
    )
  );
//console.log('saved', JSON.stringify(save, null, ' '));

for (let x = 0; x < 2; x++) {

  for (let y = 0; y < 2; y++) {

    console.log('------------------ [ new calculation ] ------------------');

    network.layers[0].neurons[0].value = x;
    network.layers[0].neurons[1].value = y;

    network.layers.forEach(layer => {

      console.log(`${layer.name}:`);

      layer.neurons.forEach(neuron => {

        let output = neuron.process();

        console.log(`\t${neuron.name}: ${output}`);

      });

    });

  }

}
