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
    //If i is 0 the current layer is the input layer, so we are setting the amount of connections to the amount of inputs.
    if (i === 0) {
      connectionsToEachNeuron = inputs;
    //If i isn't 0 than the current layer isn't the input layer, so we set the amount of connections to the amount of neurons in the previous layer.
    } else {
      connectionsToEachNeuron = layers[i - 1];
    }
    //Create the current layer with the previously calculated variables.
    this.layer = {
      neurons: this.neurons,
      connectionsToEachNeuron: connectionsToEachNeuron
    };
    //Push the layer we just created to the layer array in the neural model object.
    this.layers.push(this.layer);
  }
  //Create the inputs and push them into the input array in the neural model object.
  for (let j = 0; j < inputs; j++) {
    this.inputs.push(new input());
  }
  //Create the outputs and push them into the output array in the neural model object.
  for (let j = 0; j < outputs; j++) {
    this.outputs.push(new output());
  }

  let i = 0;
  //As long as i i smaller than the last hidden layer in the neural network continue this loop.
  while (i < layerLength - 2) {
    //Add the amount of synapses in the current hidden layer to the total amount of synapses in the hidden layers.
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
//Creates a neuron node.
function neuron() {
  this.weight = 0;
}
//Creates an input node.
function input() {
  this.value = 0;
}
//Creates a synapse with a random value between -1 and 1.
function synapse() {
  this.weight = (Math.random() * 2) - 1;
  //this.weight = Math.round((Math.random() * 2) - 1); //Creates weights that are whole numbers.
}
//Creates an output node.
let output = function() {
  this.output = 0;
}
