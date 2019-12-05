function Circle(context, color, isPhaseOut) {
  var that = this;

  this.init = function () {
    that.context = context;
    that.color = color;
    that.isPhaseOut = isPhaseOut;


    that.radius = 10;
    that.radiusAmp = 10;

    that.center = {
      x: 100,
      y: 100,
    };

    that.currentX = 0;
    that.currentY = 100;
    that.degree = 180;
    that.amplitude = 50;
    that.omega = 2;

  }

  this.drawCircle = function () {
    that.context.beginPath();
    that.context.fillStyle = that.color;
    that.context.arc(that.center.x, that.center.y, that.radius, 0, 2 * Math.PI);
    that.context.closePath();
    that.context.fill();

  }

  this.updateCirclePosition = function () {
    var tempX;

    if (this.currentX <= this.degree) {
      this.currentX++;
      tempX = (this.omega * this.currentX * Math.PI) / this.degree;

      if (this.isPhaseOut == false) {
        this.center.y = this.amplitude * Math.sin(tempX) + this.currentY;
        this.radius = (this.radiusAmp / 2) * Math.cos(tempX) + (this.radiusAmp / 2);

      } else {
        this.center.y = this.amplitude * Math.sin(tempX + Math.PI) + this.currentY;
        this.radius = (this.radiusAmp / 2) * Math.cos(tempX + Math.PI) + (this.radiusAmp / 2);

      }

    } else {
      this.currentX = 0;

    }

  }

  this.init();

}