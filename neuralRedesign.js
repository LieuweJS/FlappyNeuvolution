/**
  *@param {settings} object with the settings for the neural network function
  */
function neuralEvolution(settings) {
  //these are the default settings
  const main = this;
  main.mutationRate = 0.2;
  main.networkStructureType = 'fullyConnected';
  main.networkStructure = [2,[2,2],1];
}
