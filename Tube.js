//This function created the tubes.
function tube() {
  //Set the base stats of the tube.
  this.height = Math.floor(Math.random() * 250);
  this.bottomHeight = this.height + 100;
  this.width = width / 24;
  this.x = width / 2 - this.width;
  this.y = height - this.height;
  //This function updates the position of the tube.
  this.updatePosition = async function() {
    this.x -= gameSpeed;
  }
  //This function renders the tube onto the canvas.
  this.drawTube = async function() {
    fill(0, 100, 20);
    rect(this.x, 0, this.width, this.height);
    rect(this.x, this.bottomHeight, this.width, 400);
  }
  //This function checks whether or not the tube is offscreen.
  this.isOffscreen = async function() {
    if (this.x < 0) {
      return true;
    } else {
      return false;
    }
  }
  //This function checks whether or not the tube has collided with a clone or not.
  this.isColllision = function(clone) {
    if (clone.y < this.height || clone.y > this.bottomHeight) {
      if (clone.x >= this.x && clone.x <= (this.x + this.width)) {
        return true;
      }
    }
    return false;
  }
}
