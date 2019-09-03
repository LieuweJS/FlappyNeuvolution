//This function generate the neural model object, ot the "brain" of the clone.
function Model(inputs, layers, outputs) {
  //Set some base values and create some arrays.
  let connectionsToEachNeuron = 0;
  const layerLength = layers.length;
  this.synapsesInHiddenLayers = 0;
  this.inputs = [];
  this.layers = [];
  this.outputs = [];
  this.synapses = [];
  this.bias = 1;
  //Creates the neuron nodes specified per layer, in the specified layer.
  for (let i = 0; i < layerLength; i++) {
    this.neurons = [];
    for (let j = 0; j < layers[i]; j++) {
      this.neurons.push(new neuron());
    }
    //If
    if (i === 0) {
      connectionsToEachNeuron = inputs;
    } else {
      connectionsToEachNeuron = layers[i - 1];
    }
    this.layer = {
      neurons: this.neurons,
      connectionsToEachNeuron: connectionsToEachNeuron
    };
    this.layers.push(this.layer);
  }

  for (let j = 0; j < inputs; j++) {
    this.inputs.push(new input());
  }
  for (let j = 0; j < outputs; j++) {
    this.outputs.push(new output());
  }
  let i = 0;
  while (i < layerLength - 2) {
    this.synapsesInHiddenLayers += layers[i] * layers[i + 1];
    i++;
  }
  //Calculates the amount of synapses in the hidden layers if there are more than 1.
  if (layerLength > 1) {
    this.synapsesInHiddenLayers += layers[layerLength - 2] * layers[layerLength - 1];
  /*If there is only one hidden layera than there are no synapses that are created in the hidden layera,
  so the amount of synapses in the hidden layers is set to 0.*/
  } else {
    this.synapsesInHiddenLayers = 0;
  }
  //Calculates the total amunt of synapses in the neural network.
  this.synapsesAmount = (inputs * layers[0]) + this.synapsesInHiddenLayers + (outputs * layers[layerLength - 1]);
  //Creates the synapses.
  for (let i = 0; i < this.synapsesAmount; i++) {
    this.synapses.push(new synapse());
  }
  //Delete temporary values.
  delete this.neurons;
  delete this.layer;
  delete this.synapsesInHiddenLayers;
  delete this.synapsesAmount;
}
//Creates a neuron.
function neuron() {
  this.weight = 0;
}
//Creates an input.
function input() {
  this.value = 0;
}
//Creates a synapse with a random value between -1 and 1.
function synapse() {
  this.weight = (Math.random() * 2) - 1;
  //this.weight = Math.round((Math.random() * 2) - 1); //this works a bit too good
}
//Creates an output.
let output = function() {
  this.output = 0;
}
