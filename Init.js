let population = 50;
let cloneArray = [];
const mutationRate = 0.1
const mutationRange = 0.2
let tubes = [];
let score = 0;
let deadAmount = 0;
let generation = 1;
let highscore = 0;
let living = 0;
let button;
let button2;
const gameSpeed = 2;
let mode = 'pretrained'; // modes are: 'pretrained' and anything else
let preTrainedWeights = [1, -1, 0, -0.9545836588553311, -1, -0.5836842725986999, 1, -0.3584339810424084, 0, -1, 1, -1, -1, -1, 0.04639255381123997, -1, -1, -1, -1, -0.7440540074381041, -1, 1, 0.14087270778738903, -1, 1, 0, -1, -0.6036919384197654, 0, -0.3845506211476919, -0.5645504709587401, 1, 1, -1, 1, -1, -0.90601757578942, 1, 1, -0.802156209603202
]; //if you have pretrained weights please insert them in this array
function setup() {
  frameRate(60);
  createCanvas(800, 400);
  tubes.push(new tube());

  if (mode === 'pretrained') {
    for (let i = 0; i < population; i++) {
      cloneArray.push(new clone());
      for (let j = 0; j < cloneArray[0].neuralModel.synapses.length; j++) {
        cloneArray[i].neuralModel.synapses[j].weight = preTrainedWeights[j];
      }
    }
  } else {
    for (let i = 0; i < population; i++) {
      cloneArray.push(new clone());
    }
  }
  button = createButton('log weights of top scoring clone');
  button.mouseClicked(logWeights);
  button2 = createButton('reset');
  button2.mouseClicked(reset);
}
