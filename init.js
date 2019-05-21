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
// if you have pretrained weights please insert them in this array
let preTrainedWeights =[1, 0, 1, 0, -1, 0, -1, -1, 0, -1, 0, -1, 0, -1, 0, -1, -1, 0, 1, 1, -1, 1, -1, 0, -1, -1, 0, -1, -1, -1, 0, 0, -1, 0, -1, 0, 0, 1, -1, 0]//network [2,[5,5],1]
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
  button.mousePressed(logWeights);
  button2 = createButton('reset');
  button2.mousePressed(reset);
}
