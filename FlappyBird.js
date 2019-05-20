async function draw() {
  //noLoop()
  background(10, 50, 200);
  fill(255);
  rect(width/2, -1, width/2, height + 1);
  await drawNetwork(cloneArray[0].neuralModel)
  for (let i = 0; i < tubes.length; i++) {
    rect((tubes[i].x + tubes[i].width), (tubes[i].height + 65), 10, 10);
    await tubes[i].drawTube();
    await tubes[i].updatePosition();
    if (await tubes[i].isOffscreen() === true) {
      tubes.splice(i, 1);
    }
    if (deadAmount < population) {
      for (let j = 0; j < cloneArray.length; j++) {
        if (cloneArray[j].status === 'alive') {
          if (tubes[i].isColllision(cloneArray[j])) {
            cloneArray[j].status = 'dead';
            deadAmount++;
          } else if(cloneArray[j].y <= 0 || cloneArray[j].y >= 400) {
            cloneArray[j].status = 'dead';
            deadAmount++;
           }
           else {
            if (frameCount % 1 === 0) {
              await calculateOutput(cloneArray[j]);
            }
            await updatePosition(cloneArray[j]);
            await drawClone(cloneArray[j])
            cloneArray[j].score = score;
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
  if (frameCount % 100/gameSpeed === 0) {
    tubes.push(new tube());
  }

  fill(255);
  textSize(15);

  text('score: ' + score, 0, 15);
  text('generation: ' + generation, 0, 30);
  text('current population: ' + living, 0, 45);
  text('highscore: ' + highscore, 0, 60);
  await checkForReset();
}

async function checkForReset() {
  if (deadAmount === population) {
    await reset();
  }
}

async function reset() {
  tubes = [];
  generation++;
  deadAmount = 0;
  score = 0;
  try {
    await makeNewGen();
  } catch (error) {
    console.log(error)
    reset()
    generation -= 1
  }
}
