//This is the main game loop, it updates eacht 1/60 second.
async function draw() {
  background(10, 50, 200);
  fill(255);
  //Splits the canvas in 2 pieces, 1 for the game, 1 for the neural network.
  rect(width / 2, -1, width / 2, height + 1);
  //Draws the network of a currently alive clone.
  for (let i = 0; i < cloneArray.length; i++) {
    if (cloneArray[i].status === 'alive') {
      await drawNetwork(cloneArray[i].neuralModel, cloneArray[i].output, i);
      break;
    }
  }
  //Loop for the amount of tubes.
  for (let i = 0; i < tubes.length; i++) {
    //Draw and update the position of the current tube.
    await tubes[i].drawTube();
    await tubes[i].updatePosition();
    //If the tube is not visible anymore, delete it.
    if (await tubes[i].isOffscreen() === true) {
      tubes.splice(i, 1);
    }
    //If there are still clones alive this activates.
    if (deadAmount < population) {
      //Loop for the amount of clones that there are.
      for (let j = 0; j < cloneArray.length; j++) {
        //If the clone[j] is alive, check if it is currently hitting the tube.
        if (cloneArray[j].status === 'alive') {
          if (tubes[i].isColllision(cloneArray[j])) {
            //If the clone did hit the tube, change it's status from 'alive' to 'dead'.
            cloneArray[j].status = 'dead';
            deadAmount++;
          //If the clone did not hit the tube, check if the clone is out of bounds (fell to its death/flew too close to the sun).
          } else if (cloneArray[j].y <= 0 || cloneArray[j].y >= 400) {
            cloneArray[j].status = 'dead';
            deadAmount++;
          //If the clone is not out of bounds either, calculate the output of its neural network.
          } else {
            if (frameCount % 1 === 0) {
              await calculateOutput(cloneArray[j]);
            }
            //Update the clone's position and render it onto the canvas.
            await updatePosition(cloneArray[j]);
            await drawClone(cloneArray[j]);
            cloneArray[j].score = score;
          }
        }
      }
    }
    score++;
    //If the current score is higher than the highscre, change the highscore to the current score.
    if (score > highscore) {
      highscore = score;
    }
    //Calculate the amount of living clones.
    living = cloneArray.length - deadAmount;
  }
  //If the total amount of frames passed is divisable by 100, create a new tube.
  if (frameCount % 100 / gameSpeed === 0) {
    tubes.push(new tube());
  }
  //Display information onto the canvas.
  fill(255);
  textSize(15);
  text('score: ' + score, 0, 15);
  text('generation: ' + generation, 0, 30);
  text('current population: ' + living, 0, 45);
  text('highscore: ' + highscore, 0, 60);
  await checkForReset();
}
//This function checks if a reset is needed.
async function checkForReset() {
  if (deadAmount === population) {
    await reset();
  }
}
//This function resets the game, and also starts the breeding function to make a new generation of clones.
async function reset() {
  tubes = [];
  generation++;
  deadAmount = 0;
  score = 0;
  //Try to make a new generation.
  try {
    await makeNewGen();
  //If that doesn't work, try again, and display the error.
  } catch (error) {
    console.log(error);
    reset();
    generation -= 1;
  }
}
