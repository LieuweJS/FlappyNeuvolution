async function draw() {
  background(10, 50, 200);
  for (let i = 0; i < tubes.length; i++) {
    rect((tubes[i].x + tubes[i].width), (tubes[i].height + 65), 10, 10);
    tubes[i].drawTube();
    tubes[i].updatePosition();
    if (tubes[i].isOffscreen() === true) {
      tubes.splice(i, 1);
    }
    for (let i = 0; i < cloneArray.length; i++) {
      if (cloneArray[i].status === 'alive') {
        cloneArray[i].score += 1;
      }
    }
    if (deadAmount < population) {
      for (let j = 0; j < cloneArray.length; j++) {
        //bug here
        if (cloneArray[j].status === 'alive') {
          if (tubes[i].isColllision(cloneArray[j])) {
            cloneArray[j].status = 'dead';
            deadAmount++;
          } //else if (cloneArray[j].y <= 1 || cloneArray[j].y >= 399) {
            //deadAmount++;
            //cloneArray[j].status = 'dead';
          //} 
        else {
            //updateDistanceParameters(cloneArray[j])          
          if (frameCount % 1 === 0) {
            await calculateOutput(cloneArray[j]);
          }
          await updatePosition(cloneArray[j]);
          await drawClone(cloneArray[j])    
          }
        }
      }
    }
    score++;
    if (score > highscore) {
      highscore = score;
    }
    living = cloneArray.length - deadAmount;
  }
  if (frameCount % 120 === 0) {
    tubes.push(new tube());
  }

  fill(255);
  textSize(15);

  text('score: ' + score, 0, 15);
  text('generation: ' + generation, 0, 30);
  text('current population: ' + living, 0, 45);
  text('highscore: ' + highscore, 0, 60);
  checkForReset();
}

function checkForReset() {
  if (deadAmount === population) {
    generation++;
    deadAmount = 0;
    score = 0;
    reset();    
  }
}

function reset() {
  tubes = [];
  score = 0;
  deadAmount = 0;
  try {
    makeNewGen();
  } catch (error) {
    reset()
    generation -= 1
  }
}