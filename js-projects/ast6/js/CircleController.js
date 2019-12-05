function CircleController(context, numRows, numColumns, color1, color2) {
  var that = this;


  this.init = function () {
    that.context = context;
    that.numRows = numRows;
    that.numColumns = numColumns;
    that.color1 = color1;
    that.color2 = color2;

    that.initialCenter = {
      x: 100,
      y: 60,
    };

    that.gap = 20;
    that.circles = [];

    that.update();

  }

  this.draw = function () {
    for (var i = 0; i < that.circles.length; i++) {
      that.circles[i].updateCirclePosition();
      that.circles[i].drawCircle();

    }

  }

  this.createWave = function (isOutOfPhase) {
    var color = that.color1;

    if (!isOutOfPhase == true) {
      color = that.color2;

    }

    var currentPosY = that.initialCenter.y;

    for (var i = 0; i < that.numRows; i++) {
      currentPosY += that.gap;

      var currentPosX = 0;
      var phaseIncrease = 6;
      var currentPhase = 0;

      for (var j = 0; j < that.numColumns; j++) {
        var circle = new Circle(that.context, color, isOutOfPhase);

        console.log(circle);

        circle.center.x = currentPosX += that.gap;
        circle.center.y = currentPosY;

        circle.currentX = currentPhase += phaseIncrease;
        circle.currentY = currentPosY;

        that.circles.push(circle);

      }
    }
  }

  this.update = function () {
    that.createWave(true);
    that.createWave(false);

  }

  
  this.init();

}