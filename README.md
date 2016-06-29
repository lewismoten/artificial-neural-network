# golden-combat-park
Genetic Algorithm

A project of curiosity learning about genetic algorithms.

# API

## Creating a network

```javascript
let algorithm = create(4, 5, 3);
// input layer has 4 nodes
// hidden layer has 5 nodes
// output layer has 3 nodes
```

Must provide at least 3 size parameters for an input, hidden, and output layer.

You may create multiple hidden layers by providing more sizes. `create(4, 5, 5, 3)`

Initial weights and bias will be pre-populated.

## Reading values

Get a list of all weights/biases used to define the algorithm used for mutations, crossovers, and duplication.

```javascript
let values = reader(algorithm);
// [
// 0.4987250047589621,
// 0.5012749952410379,
// ...
// ]
```

## Writing values

Replace the weights/biases used to define the target algorithm.

```javascript
 writer(algorithm, values);
```

### Copying an algorithm
```javascript
let a = create(4, 5, 3),
  b = create(4, 5, 3),
  values = reader(a);
writer(b, values);
// b has same values as a!
```

## Running the algorithm

Moves the values through each layer and applies weights, biases, and activates each layer.

The values of the first layer must be set first.
The last layers values will contain the results.

```javascript
let algorithm = create(4, 5, 3);
algorithm[0].values = [3.4, 0.1, 1, 0.333];
let output = runner(algorithm);
// [0.1, 0.3, 0.6]
```

# Algorithm

An algorithm is made of multiple layers. It is represented as an array of layers. Calculations are done between two layers in sequential order.

```javascript
[
  inputLayer,
  hiddenLayer1,
  // ...
  hiddenLayerN,
  outputLayer
]
```

## Layer

A layer represents ... a layer. Each node within the layer has a weight that is applied to each node in the next layer. In addition, each node in the layer has a bias that is applied to all incoming values.

```javascript
{
  values: [nodeCount],
  weights: [nodeCount][nextNodeCount],
  biases: [nodeCount],
  activation: 'htan|softmax'
}
```
- values: Represents the values coming into the layer.
- weights: A weight to be applied to the next layers value. Each value has a weight applied to each of the next layers values. The last layer does not use weights.
- biases: A bias applied to the incoming values before weights are applied. The first layer does not use biases.
- activation: The function applied to each value in the next layer after the bias and weights are applied.
  - softmax: The softmax function is applied to all values as a whole. (Typically for the last layer.)
  - htan: The Hyperbolic Tangent is applied to each individual value. (Typically for all layers except the last)
