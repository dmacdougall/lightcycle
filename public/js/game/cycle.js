window.Tron.Cycle = (function() {

  var Cycle = function(canvas) {
    this.canvas = canvas;
    this.color = "#FF33C4";
    this.x = 450;
    this.y = 400;
    this.direction = Cycle.DIRECTION.NORTH;
    this.velocity = 5;
    this.width = 5;
    this.height = 5;
    this.path = new Tron.Path(this);
  };

  Cycle.DIRECTION = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

  Cycle.prototype.tick = function() {
    switch(this.direction) {
      case Cycle.DIRECTION.NORTH:
        this.y -= this.velocity;
        break;
      case Cycle.DIRECTION.EAST:
        this.x += this.velocity;
        break;
      case Cycle.DIRECTION.SOUTH:
        this.y += this.velocity;
        break;
      case Cycle.DIRECTION.WEST:
        this.x -= this.velocity;
        break;
    }

    this.path.tick();

    if (this._newPositionCollidesWithBoundary() || this._newPositionContainsNonBlackPixel()) {
      this._die();
    }
  }

  Cycle.prototype.draw = function() {
    console.log(this.x, this.y, this.width, this.height);
    var context = this.canvas.getContext("2d");
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    this.path.draw(this.canvas);
  };

  Cycle.prototype.turn = function(direction) {
    if (this.direction != direction && this.direction != (direction + 2) % 4) {
      this.direction = direction;
      this.path.addTurn();
    }
  };

  Cycle.prototype._die = function() {
    this.x = 450;
    this.y = 400;
    this.direction = Cycle.DIRECTION.NORTH;
    this.velocity = 5;
    this.path = new Tron.Path(this);
  };

  Cycle.prototype._newPositionContainsNonBlackPixel = function() {
    // If any pixel in thie new position is not black we count it as a collision.
    // pixelData is a 1d array of [r, g, b, a, ...] color/alpha values.
    var pixelData = this.canvas.getContext("2d").getImageData(this.x, this.y, this.width,  this.height).data;
    var i, j;
    for (i = 0; i < pixelData.length; i+= 4) {
      for (j = 0; j < 4; j++) {
        if (pixelData[i + j] != 0) return true;
      }
    }
    return false;
  };

  Cycle.prototype._newPositionCollidesWithBoundary = function() {
    return (this.x < 0 ||
            this.y < 0 ||
            this.x + this.width > this.canvas.width ||
            this.y + this.height > this.canvas.height);
  }

  return Cycle;
})();
