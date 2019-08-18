function Model(inputs, layers, outputs) {
  let connectionsToEachNeuron = 0;
  const layerLength = layers.length;
  this.synapsesInHiddenLayers = 0;
  this.inputs = [];
  this.layers = [];
  this.outputs = [];
  this.synapses = [];
  this.bias = 1;
  for (let i = 0; i < layerLength; i++) {
    this.neurons = [];
    for (let j = 0; j < layers[i]; j++) {
      this.neurons.push(new neuron());
    }
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
  while (i < layerLength) {
    if (layerLength % 2 === 0) {
      this.synapsesInHiddenLayers += layers[i] * layers[i + 1];
      i += 2;
    } else if (layerLength > 1) {
      while (i < layerLength - 1) {
        this.synapsesInHiddenLayers += layers[i] * layers[i + 1];
        i += 2;
      }
      this.synapsesInHiddenLayers += layers[layerLength - 2] * layers[layerLength - 1];
      break;
    } else {
      i++
    }
  }
  this.synapsesAmount = (inputs * layers[0]) + this.synapsesInHiddenLayers + (outputs * layers[layerLength - 1]);
  for (let i = 0; i < this.synapsesAmount; i++) {
    this.synapses.push(new synapse());
  }
  delete this.neurons;
  delete this.layer;
  delete this.synapsesInHiddenLayers;
  delete this.synapsesAmount;
}

function neuron() {
  this.weight = 0;
}

function input() {
  this.value = 0;
}

function synapse() {
  this.weight = (Math.random() * 2) - 1;
}

let output = function() {
  this.output = 0;
}
