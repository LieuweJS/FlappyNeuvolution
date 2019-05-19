function tube() {
  this.height = Math.floor(Math.random() * ((width - ((height / 4)))/1.5));
  this.x = width;
  this.gameSpeed = 2;
  this.width = width / 20;
  this.y = height - this.height;

  this.updatePosition = async function() {
    this.x -= this.gameSpeed;
  }

  this.drawTube = async function() {
    fill(0, 100, 20);
    rect(this.x, height - (height - (this.height + (height / 4) * 1.5)), this.width, (height - (this.height + (height / 4) * 1.5)));
    rect(this.x, 0, this.width, this.height);
  }

  this.isOffscreen = async function() {
    if (this.x < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.isColllision = async function(clone) {
    if (clone.y < this.height || clone.y > height - (height - (this.height + (height / 4) * 1.5))) {
      if (clone.x >= this.x && clone.x <= (this.x + this.width)) {
        return true;
      }
    } 
    return false;
  }
}
