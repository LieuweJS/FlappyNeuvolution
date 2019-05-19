//makes a new generation of clones
async function makeNewGen() {
  let tempArray = [];
  //sortCloneArray()
  const winner = JSON.parse(JSON.stringify(cloneArray[0].neuralModel));
  for(let i = 0; i < Math.round(population / 10); i++) {
    tempArray.push(winner);
  }
  for (let i = 0; i < Math.round(population / 20); i++) {
    let a = JSON.parse(JSON.stringify(cloneArray[i].neuralModel));
    tempArray.push(a)
  }
  for (let i = 0; i < Math.round(population / 40); i++) {
    let selectLoser = Math.round(Math.random() * Math.floor(population - (population / 40) + population / 40));
    let a = JSON.parse(JSON.stringify(cloneArray[selectLoser].neuralModel))
    tempArray.push(a);
  }

  for (let i = 0; i < tempArray.length; i++) {
    cloneArray[i].neuralModel = tempArray[i];
    cloneArray[i].status = 'alive';
    cloneArray[i].x = width / 4;
    cloneArray[i].y = height / 2;
    cloneArray[i].score = 0;
    cloneArray[i].yDistance = 0;
    cloneArray[i].mappedYDistance = 0;
    cloneArray[i].xDistance = 0;
    cloneArray[i].mappedXDistance = 0;
    cloneArray[i].output = 0;
  }
  for (let i = tempArray.length - 1; i < population; i++) {
    let randomFather = Math.round(Math.random() * (tempArray.length - 1))
    let randomMother = Math.round(Math.random() * (tempArray.length - 1))
    let d = await breed(tempArray[randomFather], tempArray[randomMother])
    let mutated = await mutate(d)
    cloneArray[i].neuralModel = mutated
    cloneArray[i].status = 'alive';
    cloneArray[i].x = width / 4;
    cloneArray[i].y = height / 2;
    cloneArray[i].score = 0;
    cloneArray[i].yDistance = 0;
    cloneArray[i].mappedYDistance = 0;
    cloneArray[i].xDistance = 0;
    cloneArray[i].mappedXDistance = 0;
    cloneArray[i].output = 0;
  }
  tempArray = []
  cloneArray[0].neuralModel = winner;
  //console.log(cloneArray)
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
  const length = Math.round(network.synapses.length / mutationRate)
  for (let i = 0; i < length; i++) {
    let randomChange = Math.floor(Math.random() * (network.synapses.length - 1))
    let randomValue = randNum(0 - mutationRange, mutationRange)
    //const randomChoice = Math.floor(Math.random() * network.synapses.length-1)
    //bug here
    network.synapses[randomChange].weight += randomValue;
  }
  return network
}
//UTILS
const mapNum = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randNum(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function SELU6(x) {
  this.PReLU = function(a, x) {
    if (x < 0) {
      return a * x;
    } else {
      return x;
    }
  }
  this.ELU = function(a, x) {
    return this.PReLU(a, Math.expm1(x));
  }
  this.SELU = function(x) {
    return 1.0507 * this.ELU(1.6732, x);
  }
  this.result = this.SELU(x);
  if (this.result > 6) {
    return 6
  } else {
    return x
  }
}

function RELU6(x) {
  if (x < 0) {
    return 0;
  } else {
    if (x > 6) {
      return 6;
    } else {
      return x;
    }
  }
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

function sigmoid(x) {
  return 1 / (1 + Math.pow(Math.E, -x));
}

async function normalise(x) {
  return x / 2 / (1 + Math.abs(x) * 0.5)
}

function logWeights() {
  let savedIndex = 0;
  let synapsesArray = [];
  for(let i = 1; i < cloneArray.length-1; i++) {
    if(cloneArray[i].score > cloneArray[i-1].score) {
      savedIndex = i;
    }
  }
  for(let i = 0; i < cloneArray[savedIndex].neuralModel.synapses.length; i++) {
    synapsesArray.push(cloneArray[savedIndex].neuralModel.synapses[i].weight)
  }
  console.log(synapsesArray)
}
