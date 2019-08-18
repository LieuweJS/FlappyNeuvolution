async function makeNewGen() {
  let tempArray = [];
  //dort the cloneArray based on score so the winner comes in slot [0].
  cloneArray.sort((a, b) => (a.score < b.score) ? 1 : -1)
  const winner = JSON.parse(JSON.stringify(cloneArray[0].neuralModel));
  //save the winner neural net from the previous round to the temArray, used later.
  for (let i = 0; i < Math.round(population / 10); i++) {
    tempArray.push(winner);
  }
  //save the neural networks of the top 20% of clones so they can be used for breeding later.
  for (let i = 0; i < Math.round(population / 5); i++) {
    let a = JSON.parse(JSON.stringify(cloneArray[i].neuralModel));
    tempArray.push(a);
  }

  for (let i = 0; i < tempArray.length; i++) {
    //replace the neural networks of the already existing clones with the previously saved clones. (possibly unneeded?)
    //for (let j = 0; j < cloneArray[i].neuralModel.synapses.length; j++) {
      //cloneArray[i].neuralModel.synapses[j].weight = tempArray[i].synapses[j].weight;
    //}
    //reset the clone base stats.
    cloneArray[i].status = 'alive';
    cloneArray[i].x = width / 32;
    cloneArray[i].y = height / 2;
    cloneArray[i].score = 0;
    cloneArray[i].yDistance = 0;
    cloneArray[i].mappedYDistance = 0;
    cloneArray[i].xDistance = 0;
    cloneArray[i].mappedXDistance = 0;
    cloneArray[i].output = 0;
    cloneArray[i].color = "#FFFF00"
  }

  for (let i = tempArray.length - 1; i < population; i++) {
    //select father and mother for the child at random from the top 20% of neural networks. (previously saved)
    let randomFather = Math.round(Math.random() * (tempArray.length - 1));
    let randomMother = Math.round(Math.random() * (tempArray.length - 1));
    //breed a new child based on the 'genes' of the parents.
    let child = await breed(tempArray[randomFather], tempArray[randomMother]);
    //apply mutation to the child's neural network.
    let mutatedNetwork = await mutate(child);
    //replace neural model of clone with the new child's neural network.
    cloneArray[i].neuralModel = mutatedNetwork;
    //reset the clones base stats.
    cloneArray[i].status = 'alive';
    cloneArray[i].x = width / 32;
    cloneArray[i].y = height / 2;
    cloneArray[i].score = 0;
    cloneArray[i].yDistance = 0;
    cloneArray[i].mappedYDistance = 0;
    cloneArray[i].xDistance = 0;
    cloneArray[i].mappedXDistance = 0;
    cloneArray[i].output = 0;
    cloneArray[i].color = "#FFA500"
  }
  //empty the tempArray and replace the first clones neural model with the winner's neural model of the previous round.
  tempArray = []
  cloneArray[0].neuralModel = winner;
  cloneArray[0].color = "FF0000";
}

async function breed(father, mother) {
  for (let i = 0; i < father.synapses.length; i++) {
    let dna = Math.round(Math.random())
    if (dna === 1) {
      father.synapses[i].weight = mother.synapses[i].weight;
    }
  }
  return father;
}

async function mutate(network) {
  const length = Math.round(network.synapses.length / mutationRate);
  for (let i = 0; i < network.synapses.length; i++) {
    if (Math.random() <= mutationRate) {
      let randomValue = randNum(0 - mutationRange, mutationRange);
      network.synapses[i].weight += randomValue;
      if (network.synapses[i].weight > 1) {
        network.synapses[i].weight = 1;
      } else if (network.synapses[i].weight < -1) {
        network.synapses[i].weight = -1;
      }
    }
  }
  return network;
}
//UTILS
const mapNum = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randNum(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function ELU(x) {
  this.PReLU = function(a, x) {
    if (x < 0) {
      return a * x;
    } else {
      return x;
    }
  }
  return this.PReLU(1.6732, Math.expm1(x));
}

async function normalise(x) {
  return x / 2 / (1 + Math.abs(x) * 0.5);
}

function logWeights() {
  let savedIndex = 0;
  let synapsesArray = [];
  for (let i = 1; i < cloneArray.length - 1; i++) {
    if (cloneArray[i].score > cloneArray[i - 1].score) {
      savedIndex = i;
    }
  }
  for (let i = 0; i < cloneArray[savedIndex].neuralModel.synapses.length; i++) {
    synapsesArray.push(cloneArray[savedIndex].neuralModel.synapses[i].weight);
  }
  console.log(synapsesArray);
}

async function drawNetwork(network, output, cloneNumber) {
  let totalOutputs = network.outputs.length;
  let totalLayers = network.layers.length;
  let totalInputs = network.inputs.length;
  let totalSynapses = network.synapses.length;
  let totalNeurons = [];
  for (let i = 0; i < totalLayers; i++) {
    let thisLayer = 0;
    for (let j = 0; j < network.layers[i].neurons.length; j++) {
      thisLayer++;
    }
    totalNeurons.push(thisLayer);
  }
  totalNeurons.sort(sortDescend);
  let biggest = totalInputs;
  if (totalOutputs > totalInputs) {
    biggest = totalOutputs;
  }
  for (let i = 0; i < totalNeurons.length; i++) {
    if (totalNeurons[i] > biggest) {
      biggest = totalNeurons[i];
    }
  }
  const maxNodeHeight = (height / (biggest + 1)) / 2
  let incrementX = (width / 2) / (1 + totalLayers + 2)
  let x = width / 2 + incrementX;

  distBetweenNodes = height / network.inputs.length;
  y = distBetweenNodes / 2;
  let coordinateModel = new CoordinateModel;
  for (let i = 0; i < totalInputs; i++) {
    let inputLocation = {
      'x': x,
      'y': y
    }
    coordinateModel.inputs.push(inputLocation);
    ellipse(x, y, maxNodeHeight);
    y += distBetweenNodes;
  }
  x += incrementX
  for (let i = 0; i < totalLayers; i++) {
    let distBetweenNodes = height / network.layers[i].neurons.length;
    let y = distBetweenNodes / 2;
    let layerCoordinates = new LayerCoordinates;
    for (let j = 0; j < totalNeurons[0]; j++) {
      let neuronLocation = {
        'x': x,
        'y': y
      }
      layerCoordinates.neurons.push(neuronLocation);
      ellipse(x, y, maxNodeHeight);
      y += distBetweenNodes;
    }
    coordinateModel.layers.push(layerCoordinates);
    x += incrementX;
  }
  distBetweenNodes = height / network.outputs.length;
  y = distBetweenNodes / 2;
  for (let i = 0; i < totalOutputs; i++) {
    let outputLocation = {
      'x': x,
      'y': y
    }
    coordinateModel.outputs.push(outputLocation);
    if (output > 0.5) {
      fill(0, 255, 0)
    } else {
      fill(255, 0, 0)
    }
    ellipse(x, y, maxNodeHeight);
    y += distBetweenNodes;
  }
  let q = 0;
  for (let i = 0; i < network.layers.length; i++) {
    for (let j = 0; j < network.layers[i].neurons.length; j++) {
      if (i === 0) {
        let currentNodeX = coordinateModel.layers[i].neurons[j].x;
        let currentNodeY = coordinateModel.layers[i].neurons[j].y;
        for (let k = 0; k < network.inputs.length; k++) {
          if (network.synapses[q].weight < 0) {
            stroke(0, 0, 255);
          } else {
            stroke(255, 0, 0);
          }
          let connectedNodeX = coordinateModel.inputs[k].x;
          let connectedNodeY = coordinateModel.inputs[k].y;
          line(currentNodeX, currentNodeY, connectedNodeX, connectedNodeY);
          q++;
        }
      } else {
        let currentNodeX = coordinateModel.layers[i].neurons[j].x;
        let currentNodeY = coordinateModel.layers[i].neurons[j].y;
        for (let k = 0; k < network.layers[i - 1].neurons.length; k++) {
          if (network.synapses[q].weight < 0) {
            stroke(0, 0, 255);
          } else {
            stroke(255, 0, 0);
          }
          let connectedNodeX = coordinateModel.layers[i - 1].neurons[k].x;
          let connectedNodeY = coordinateModel.layers[i - 1].neurons[k].y;
          line(currentNodeX, currentNodeY, connectedNodeX, connectedNodeY);
          q++;
        }
      }
    }
  }
  for (let i = 0; i < network.outputs.length; i++) {
    let currentNodeX = coordinateModel.outputs[i].x;
    let currentNodeY = coordinateModel.outputs[i].y;
    for (let j = 0; j < network.layers[network.layers.length - 1].neurons.length; j++) {
      if (network.synapses[q].weight < 0) {
        stroke(0, 0, 255);
      } else {
        stroke(255, 0, 0);
      }
      let connectedNodeX = coordinateModel.layers[network.layers.length - 1].neurons[j].x;
      let connectedNodeY = coordinateModel.layers[network.layers.length - 1].neurons[j].y;
      line(currentNodeX, currentNodeY, connectedNodeX, connectedNodeY);
      q++
    }
  }
  stroke(0)
  fill(0)
  text('network of clone: ' + cloneNumber, (width / 2) + 10, height - 1)
}

function LayerCoordinates() {
  this.neurons = []
}

function CoordinateModel() {
  this.inputs = []
  this.layers = []
  this.outputs = []
}

function sortDescend(a, b) {
  return b - a;
}
