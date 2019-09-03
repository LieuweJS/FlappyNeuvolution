/*
*The basic principle of this function is to calculate the outputs of the neural network
*using the pregenerated weights in the model and the current output.
*This is done by taking the input(s) and running them through the neurons, each neuron is connected to eachother.
*Each neuron has a 'z' value, this value is, aquired by multiplying the input(s) with the weights of the synapses that they are attached to,
*we then add up all of these values with each other and run them through the ELU (Exponential Linear Unit) activation function.
*Repeat this process with each neuron in the model until you get to the output, where the output will be normalised to a value between -1 and 1.
*/
//This function calculates the output of the nerual model, when all input values and the neural model of the clone are given.
async function getOutput(model, inputValues) {
  //Set some base values and create an output array.
  this.output = [];
  let k = 0;
  let output = 0;
  //Loop for the amount of layers the given neural model has (excluding the output layer).
  for (let i = 0; i < model.layers.length; i++) {
    //Loop for the amount of neurons the current layer has.
    for (let j = 0; j < model.layers[i].neurons.length; j++) {
      let z = 0;
      //Activates if i is the same as the last hidden layer.
      if (i === model.layers.length - 1) {
        //Loop for the amount of connections in the current layer.
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          //If there is only one layer calculate z
          if (model.layers.length === 1) {
            z += model.layers[i].neurons[l].weight * model.synapses[k].weight;
            //exit the loop
            break;
          //If there are more than 1 layer, calculate the z and add it to the previous z.
          } else {
            z += model.layers[i - 1].neurons[l].weight * model.synapses[k].weight;
            k++;
          }
        }
        //Run z + bias through the ELU function to calculate the weight of the current neuron of the current layer.
        model.layers[i].neurons[j].weight = ELU(z + model.bias);
      //activates if the current layer is the first layer (the input layer).
      } else if (i === 0) {
        //Loop for the amount of connections in the current layer.
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          //Calculate the z of the current input node and add it to the previous z.
          z += inputValues[l] * model.synapses[k].weight;
          k++;
        }
        //Calculate the ELU of z
        model.layers[i].neurons[j].weight = ELU(z);
      //If this isn't the input layer, and also isn't the last hidden layer, this will activate.
      } else {
        //Loop for the amount of connections in the current layer.
        for (let l = 0; l < model.layers[i].connectionsToEachNeuron; l++) {
          //Calculate the z of the current node and add it to the previous z.
          z += model.layers[i - 1].neurons[l].weight * model.synapses[k].weight;
          k++;
        }
        //Calculate the ELU of the z.
        model.layers[i].neurons[j].weight = ELU(z);
      }
    }
  }
  //Loop for the amount of outputs in the neural model.
  for (let j = 0; j < model.outputs.length; j++) {
    //Reset output.
    output = 0;
    //Loop for the amount of neurons that there are in the last hidden layer.
    for (let i = 0; i < model.layers[model.layers.length - 1].neurons.length; i++) {
      output += model.layers[model.layers.length - 1].neurons[i].weight * model.synapses[k].weight;
      k++;
    }
    //Normalise the output value.
    this.output.push(await normalise(output));
    model.outputs[j] = await normalise(output);
  }
  //Return the output value.
  return this.output;
}
