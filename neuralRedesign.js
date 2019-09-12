let neuralEvolution = function(settings) {
  //these are the default settings
  const main = this;

  main.settings {
    population = 50,
    networkStructure = [1,[1],1],
    mutationRate = 0.2,
    mutationRange = 0.3,
    newNets = 0.2,
    bestNets = 0.2,
    activation = 'ELU'

  }

  main.setSettings = function(settings) {
    for(let i in settings) {
      if(settings[i] != undefined) {
        main.settings[i] = this.settings[i];
      }
    }
  }
  main.setSettings(settings);

  let createNetwork = function(networkStructure) {
    for() {

    }
  }

  let breed = function(father, mother, childAmount) {
    for(let i in father) {
      if(Math.random() <= 0.5) {
        father = mother;
      }
    }

    for(let i in father) {
      if(Math.random() <= main.settings.mutationRate) {
        father = father + limitedRandom(main.settings.mutationRange);
      }
    }
  }

  let neuron = function() {
    let weights = function(neuron) {
      this.weight = (math.random() * 2) - 1;
    }
  }

  let limitedRandom = function(max) {
    min = 0 - limit;
    return min + Math.random() * (max - min);
  }

  let elu = function(x) {
    this.PReLU = function(a, x) {
      if (x < 0) {
        return a * x;
      } else {
        return x;
      }
    }
    return this.PReLU(1.6732, Math.expm1(x));
  }

  let relu = function() {

  }

  let sigmoid = function(x) {
    return 1 / (1 + Math.exp(-input));
  }

  let linear = function() {

  }

  let normalise = function(x) {
    return x / 2 / (1 + Math.abs(x) * 0.5);
  }
}
