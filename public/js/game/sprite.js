window.Tron.Sprite = (function() {

  var Sprite = function(canvas) {
    this.canvas = canvas;
    this.color = "#FF33C4";
    this.x = 450;
    this.y = 400;
    this.direction = Sprite.DIRECTION.NORTH;
    this.velocity = 5;
    this.width = 5;
    this.height = 5;
  };

  Sprite.DIRECTION = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

  Sprite.prototype.tick = function() {
    switch(this.direction) {
      case Sprite.DIRECTION.NORTH:
        this.y -= this.velocity;
        break;
      case Sprite.DIRECTION.EAST:
        this.x += this.velocity;
        break;
      case Sprite.DIRECTION.SOUTH:
        this.y += this.velocity;
        break;
      case Sprite.DIRECTION.WEST:
        this.x -= this.velocity;
        break;
    }

    if (this.x < 0 || this.y < 0 || this.x > this.canvas.width || this.y > this.canvas.height) {
      this._die();
    }
  }

  Sprite.prototype.draw = function() {
    var context = this.canvas.getContext("2d");
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  Sprite.prototype._die = function() {
    this.x = 450;
    this.y = 400;
    this.direction = Sprite.DIRECTION.NORTH;
    this.velocity = 5;
  }

  return Sprite;
})();