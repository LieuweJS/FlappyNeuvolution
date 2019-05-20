function clone() {
  this.score = 0;
  this.neuralModel = new Model(2,[5,5],1);
  this.size = height / 12;
  this.x = width / 32;
  this.y = height / 2;
  this.gravity = 0.7;
  this.lift = -8;
  this.velo = 0;
  this.status = 'alive';
  this.yDistance = 0;
  this.output = 0;
}

async function updateDistanceParameters(clone) {
  for (let i = 0; i < tubes.length; i++) {
    if (clone.x < tubes[i].x + tubes[i].width) {
      clone.yDistance = clone.y - ((tubes[i].height) + 65);
      return;
    }
  }
}

async function drawClone(clone) {
  fill(255, 255, 0);
  ellipse(clone.x, clone.y, clone.size, clone.size);

  return;
}
async function calculateOutput(clone) {
  await updateDistanceParameters(clone);
  clone.output = await getOutput(clone.neuralModel, [clone.yDistance, clone.velo]);
  if (clone.output > 0.5) {
    clone.velo += clone.lift;
  }
  return;
}

async function updatePosition(clone) {
  clone.velo += clone.gravity;
  clone.y += clone.velo;
  if (clone.y > height) {
    clone.y = height;
    clone.velo = 0;
  }
  if (clone.y < 0) {
    clone.y = 0;
    clone.velo = 0;
  }
  return;
}
