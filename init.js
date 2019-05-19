let population = 50;
let cloneArray = [];
const mutationRate = 0.1 * 100
const mutationRange = 0.2
let tubes = [];
let score = 0;
let deadAmount = 0;
let generation = 1;
let highscore = 0;
let living = 0;

function setup() {
  frameRate(60)
  createCanvas(400, 400);
  tubes.push(new tube());
  for (let i = 0; i < population; i++) {
    cloneArray.push(new clone());
  }
}