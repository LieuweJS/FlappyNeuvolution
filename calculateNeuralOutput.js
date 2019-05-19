async function getOutput(model, inputValues) {
  this.output = []
  let k = 0;
  let output = 0;
  //loop for the amount of layers
  for (let i = 0; i < model.layers.length; i++) {
    //loop for the amount of neurons in each layer
    for (let j = 0; j < model.layers[i].neurons.length; j++) {
      let z = 0;
      if (i === model.layers.length - 1) { //apply bias at the last hidden layer
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          if (model.layers.length === 1) {
            z += model.layers[i].neurons[l].weight * model.synapses[k].weight
            break;
          } else {
            z += model.layers[i - 1].neurons[l].weight * model.synapses[k].weight
            k++
          }
        }
        model.layers[i].neurons[j].weight = ELU(z + model.bias);
      } else if (i === 0) { //if this is the first hidden layer
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          z += inputValues[l] * model.synapses[k].weight
          k++
        }
        model.layers[i].neurons[j].weight = ELU(z);
      } else {
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          z += model.layers[i - 1].neurons[l].weight * model.synapses[k].weight
          k++
        }
        model.layers[i].neurons[j].weight = ELU(z);
      }
    }
  }
  //calculate output
  for (let j = 0; j < model.outputs.length; j++) {
    output = 0;
    //loop for amount of connections to the output node
    for (let i = 0; i < model.layers[model.layers.length - 1].neurons.length; i++) {
      output += model.layers[model.layers.length - 1].neurons[i].weight * model.synapses[k].weight;
      k++
    }
    this.output.push((await normalise(output)))
    model.outputs[j] = (await normalise(output))
  }
  return this.output;
}
