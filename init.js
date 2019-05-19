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
let button;
let button2;
let mode = 'pretrainedk' // modes are: 'pretrained' and 'untrained'
// if you have pretrained weights please insert them in this array
let preTrainedWeights =[-0.0720357951593038, -0.9067475195946479, -0.3108067166778077, 0.295741548769866, -0.10724364253089824, -0.20519549945583648,
   -0.1321841544216027, 0.7295453173902819, -0.5542386663299901, 0.9864504581036142, -0.40872131576973025, 0.6307114114187442, -0.5027166263222806,
   -0.8130917614864481, 0.43912948714230593, -0.6770285306901074, 0.6234689640690498, -0.8829460364027981, 0.9579282362658361, -0.20001016370746738,
   -0.05127194004011004, 0.13487495322761456, -0.5254991459060636, 0.37033725026600806, -0.9291137207409954, 0.9425493169723707, -0.44686371881502396,
   0.9087427353722202, -0.8712063702966506, -0.42168910971843454, 0.6916710165782005, 0.23417474279817707, 0.16677613571329353, 0.4592103235444349,
   -0.6032464230982968, -0.028432856940544315, 0.5832868853963125, 0.4259374145774424, -0.1156432506445646, -0.2156463527850776]
function setup() {
  frameRate(60)
  createCanvas(400, 400);
  tubes.push(new tube());

  if (mode === 'pretrained') {
    for (let i = 0; i < population; i++) {
      cloneArray.push(new clone())
      for (let j = 0; j < cloneArray[0].neuralModel.synapses.length; j++) {
        cloneArray[i].neuralModel.synapses[j].weight = preTrainedWeights[j];
      }
    }
  } else {
    for (let i = 0; i < population; i++) {
      cloneArray.push(new clone());
    }
  }
  button = createButton('log weights of top scoring clone')
  button.mousePressed(logWeights);
  button2 = createButton('reset')
  button2.mousePressed(reset)
}
