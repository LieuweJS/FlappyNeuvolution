/**
  *@param {settings} object with the settings for the neural network function
  */
let neuralEvolution = function(settings) {
  //these are the default settings
  const main = this;
  main.settings {
    population = 50,
    network = [1,[1],1],
    mutationRate = 0.2,
    activation = 'ELU'

  }

  main.setSettings = function(settings) {
    for(let i in this.settings) {
      if(this.settings[i] != undefined) {
        main.settings[i] = this.settings[i];
      }
    }
  }
  main.setSettings(settings);

  let breed = function(father, mother, childAmount) {
    for(let i in father) {

    }

    for() {

    }
  }
  let ELU = function() {

  }

  let RELU = function() {

  }

  let SIGMOID = function() {

  }

  let LINEAR = function() {

  }
}
