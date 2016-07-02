# Artificial Neural Networks (ANN)

- Learns to improve itself to accomplish a goal.
- Simulates how neurons work in a brain.
- Capable of performing parallel processing (If code/language/os/hardware supports it)

# Terminology

## Anatomy of a Neural Network
| Term | Description |
| --- | --- |
| Network | A collection of neurons that connect to all other neurons in neighboring layers |
| Neuron | Performs a calculation against its inputs. See [Anatomy of a Neuron](##Anatomy of a Neuron) |
| Node | See neuron. Sometimes referred to as the source nodes or input node. |
| Layer | A collection of neurons that perform operations on all data exposed by the previous layer. |
| Level | See layer |
| Input | A value from an external source |
| Output | A value exposed to an external source |
| Deep Network | More than 1 hidden layer |
| Feed Forward Network | Logic moves forward, one layer to the next |
| Recurrent Network | Neurons go back to previous layers. Adds state/memory. |
| Symmetric Network | No import/outputs, can go forward or backwards (same weights). |
| Multi-layer Perceptrons | See Neural Network |
| Input Layer | A collection of inputs. The first layer in a network. |
| Output Layer | A collection of outputs. The final layer in a network. |
| Hidden Layer | A layer that is not seen externally from outside of the network. |
| Middle Layer | See hidden layer |
| Decision | The final answer (see output layer) |

### A Neuron Network in action
A neural network can have 3 or more layers. Numeric values (signals) come into the first layer, mapped from external data. Each layer activates in sequential order. After the last layer is activated, the result of the processed input values can be found in the last layers output values.

The hidden layer is similar to the methodology of black boxes. We don't see what goes on. We just know its doing its thing.

## Anatomy of a Neuron


### Anatomy of a Biological Neuron
| Term | Description |
| --- | --- |
| Output | If enough information was received, the neuron transmits a signal |
| Bias | Each neuron has bias that it applies to the transfer function. It is often represented as the neuron itself. |
| Weight | A weight is multiplied against the value of the neuron it came from, and is specific to the neuron that it is going to. It is often represented as a line connecting two neurons. |
| Threshold | A value to target to pass a value to the next set of neurons |
| Perceptron | Maps values from the previous layer into a binary value |
| Transfer Function | Sums weights and values from the previous layer |
| Activation | Applies bias to its input and performs a calculation |

### Anatomy of an Artificial Neuron
| Term | Description |
| --- | --- |
| Synapse | The action of a neuron receiving a value. |
| Resting Potential | The state when voltage-gated ion channels are closed |
| Dendrites | The input paths (weights) from other neurons |
| Axon | The output signal to the next layers synapses. |
| Signal | Information received. (ie. Input value * weight) |
| Threshold | See voltage-gated channels  |
| Plasma membrane | The outer layer of a neuron cell |
| Voltage-gated ion channel | The gate from which a neuron fires |
| Action Potential (AP) | A signal emitted by the neuron. |
| Nerve Impulse | See Action Potential |
| Spike | See Action Potential |
| Spike Train | Temporal sequence of action potentials as a result of a spike |
| Fire | The act of a neuron emitting an action potential |

### Comparison between a Biological and Artificial Neuron

### A Neuron in action

The neurons (perceptron) in the input layer receive a value/signal between -10 and 10 from an external resource representing external data. Hidden and output layers receive a binary value of one or zero from the previous layer. These layers also apply a bias and sum weights to the signal from the previous layer. The weight can be thought of as the resistance along dendrites, affecting the signal coming in through synapses. The sum off all weights is evaluated to check if it meets a threshold determined by the neurons bias (nucleus). If the threshold is achieved, then the neuron fires off a signal (via axon) to all neurons it is connected to in the next layer. The output layer does not have a weight to apply to the signals from each node. After applying its own bias, all neurons in the output layer are activated to normalize the result in relation to each other.

In simple terms, the output of a neuron is the weighted sum of its inputs.

### Activation Functions
- softmax
- Linear
- Linear threshold
- Sigmoid Logistic
- Hyperbolic tangent (htan)
- Gaussian
- cubic funciton?

## How to use a network

You will first need to map your data for the input values. Each neuron can accept a number between -10 and 10. You can use more that one neuron to represent the whole of your mapped data. The output can use the same method. The outputs range from 0 to 1.

### Training

## Learning
[Neural Networks Learning & Evaluation](http://cs231n.github.io/neural-networks-3/)

[Weight Decay vs Learning Rate](http://stats.stackexchange.com/questions/29130/difference-between-neural-net-weight-decay-and-learning-rate)

[Parameters of Learning Functions](http://www.ra.cs.uni-tuebingen.de/SNNS/UserManual/node52.html)

[Improving how Neural Networks Learn](http://neuralnetworksanddeeplearning.com/chap3.html)

# R&D - look later?

- Expected Output -> Error Calculation -> Error back propagation
 - change last layer first to come close, then change previous layer
- Derivatives
 - slope, how fast f changes around x
 - will f increase or decrease if we increase x
 - is x higher or lower than it should be
 - chain rule
 - sum of Derivatives

- Training Set
- Accuracy / Fitness
- Feedback Loop (jumps back)
- Feed forward (jumps a layer - maybe?)
- Gradient Descent
- Features
- Weight Matrix
- Fuzzy Logic
- conciousness
- Refactory period - impossible to receive/transmit signal

# Things that could affect processing
- Does a neuron fire immediately when the threshold is met?
- Is the timespan for a signal fired always the same?
- Does relative location cause a delay in signals?
- Does a neurons signal taper off, or is it instant on/off?
- Once a threshold is met, is it then lowered due to an inertia-like effect - increasing the output signal?
- Is the signal a constant on/off, or does it "travel" or "pulse"?
- Can a neuron connect to itself?
- What happens when a neuron is created, ages, injury, degredation, dies?
- How often does a neuron change witch neurons it connects to?
- How often does a neuron change where it is connected?
- Does the number of neurons connected to one neuron affect the signal strength?
  - Do neurons further away get less of a signal, or any at all if the signal was weak to begin with?
  - If a neuron along the path is in a refactory period, is signal along the path affected?
- Can a neurons axon connect to another neurons axon, increasing the signal along a path?
- Can an axon also receive a signal?
- What happens if the neurons signal is so strong, the axon is not capable of transmitting the full value?
