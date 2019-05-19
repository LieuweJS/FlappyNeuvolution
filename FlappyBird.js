async function draw() {
  background(10, 50, 200);
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
          if (await tubes[i].isColllision(cloneArray[j])) {
            cloneArray[j].status = 'dead';
            deadAmount++;
          } else {
          if (frameCount % 1 === 0) {
            await calculateOutput(cloneArray[j]);
          }
          await updatePosition(cloneArray[j]);
          await drawClone(cloneArray[j])
          cloneArray[j].score = score;
          continue;
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
  cloneArray.sort((a, b) => (a.score < b.score) ? 1 : -1)
  //console.log(cloneArray)
  try {
    await makeNewGen();
  } catch (error) {
    console.log(error)
    checkForReset()
    generation -= 1
  }
}
