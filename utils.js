//makes a new generation of clones
async function makeNewGen() {
  let tempArray = [];
  cloneArray.sort((a, b) => (a.score < b.score) ? 1 : -1)
  const winner = JSON.parse(JSON.stringify(cloneArray[0].neuralModel));
  for(let i = 0; i < Math.round(population / 10); i++) {
    tempArray.push(winner);
  }
  for (let i = 0; i < Math.round(population / 20); i++) {
    let a = JSON.parse(JSON.stringify(cloneArray[i].neuralModel));
    tempArray.push(a)
  }

  for (let i = 0; i < tempArray.length; i++) {
    for(let j = 0; j < cloneArray[i].neuralModel.synapses.length; j++) {
      cloneArray[i].neuralModel.synapses[j].weight = tempArray[i].synapses[j].weight;
    }
    cloneArray[i].status = 'alive';
    cloneArray[i].x = width / 32;
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
    cloneArray[i].x = width / 32;
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
  for (let i = 0; i < network.synapses.length; i++) {
    if (Math.random() <= mutationRate) {
      let randomValue = randNum(0 - mutationRange, mutationRange)
      network.synapses[i].weight += randomValue;
      if (network.synapses[i].weight > 1) {
        network.synapses[i].weight = 1
      } else if (network.synapses[i].weight < -1) {
        network.synapses[i].weight = -1
      }
    }
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
