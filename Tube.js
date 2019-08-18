function tube() {
  this.height = Math.floor(Math.random() * 250);
  this.bottomHeight = this.height + 100;
  this.width = width / 24;
  this.x = width / 2 - this.width;
  this.y = height - this.height;

  this.updatePosition = async function() {
    this.x -= gameSpeed;
  }

  this.drawTube = async function() {
    fill(0, 100, 20);
    rect(this.x, 0, this.width, this.height);
    rect(this.x, this.bottomHeight, this.width, 400);
  }

  this.isOffscreen = async function() {
    if (this.x < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.isColllision = function(clone) {
    if (clone.y < this.height || clone.y > this.bottomHeight) {
      if (clone.x >= this.x && clone.x <= (this.x + this.width)) {
        return true;
      }
    }
    return false;
  }
}
