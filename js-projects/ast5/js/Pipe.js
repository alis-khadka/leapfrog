function Pipe(width, height, parentClass) {
  var that = this;

  this.width = width;
  this.height = height;

  this.pipe;
  this.pipes = [];

  this.pipeSpeed = 3;
  this.pipeGap = 130;
  this.pipeInitialLeft = 300;
  this.pipeLeft1 = this.pipeInitialLeft;
  this.pipeLeft2 = this.pipeInitialLeft + 180;

  this.randomNum = function (min, max) {
    var randNum = Math.round(Math.random() * (max - min) + min);

    return randNum;
  }

  this.pipeTop = this.randomNum(200, 450);
  this.pipeFlipTop = (this.pipeTop - this.pipeGap) - this.height;

  this.init = function () {
    for (var flip = 0; flip < 4; flip++) {
      that.pipe = document.createElement('div');
      that.pipe.style.position = 'absolute';
      that.pipe.style.backgroundImage = 'url("./images/pipe.png")';
      that.pipe.style.backgroundSize = 'cover';
      that.pipe.style.backgroundRepeat = 'no-repeat';
      that.pipe.style.zIndex = 80;
      that.pipe.style.width = that.width + 'px';
      that.pipe.style.height = that.height + 'px';
      that.pipe.style.left = that.pipeInitialLeft + 'px';
      that.pipe.style.top = that.pipeTop + 'px';

      if (flip % 2 == 0) {
        that.pipe.style.transform = 'Scale(-1)';
        that.pipe.style.top = this.pipeFlipTop + 'px';
      }

      if (flip >= 2) {
        that.pipe.style.left = that.pipeLeft2 + 'px';
      }

      that.pipes[flip] = that.pipe;
    }

    return that.pipes;
  }

  this.movePipe = function () {
    that.pipeLeft1 -= that.pipeSpeed;
    that.pipeLeft2 -= that.pipeSpeed;
  }

  this.drawPipe = function () {
    for (var i = 0; i < 4; i++) {
      that.pipes[i].style.left = that.pipeLeft1 + 'px';

      if (i >= 2) {
        that.pipes[i].style.left = that.pipeLeft2 + 'px';
      }
    }
  }

  this.resetPipe = function () {
    if (that.pipeLeft1 <= -60) {
      that.pipeLeft1 = that.pipeInitialLeft;
      that.pipeTop = that.randomNum(200, 450);
      that.pipeFlipTop = (that.pipeTop - that.pipeGap) - that.height;

      for (var i = 0; i < 2; i++) {
        that.pipes[i].style.top = that.pipeTop + 'px';

        if (!i) {
          that.pipes[i].style.top = that.pipeFlipTop + 'px';
        }
      }
    }

    if (that.pipeLeft2 <= -60) {
      that.pipeLeft2 = that.pipeInitialLeft;
      that.pipeTop = that.randomNum(200, 450);
      that.pipeFlipTop = (that.pipeTop - that.pipeGap) - that.height;

      for (var i = 2; i < 4; i++) {
        that.pipes[i].style.top = that.pipeTop + 'px';

        if (i == 2) {
          that.pipes[i].style.top = that.pipeFlipTop + 'px';
        }
      }
    }
  }

  this.checkCollision = function () {
    for (var i = 0; i < 4; i++) {
      // if (i < 2) {
      switch (i) {

        case 0:
          if ((Math.abs(that.pipeLeft1 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (parentClass.birdClass.top) <= ((that.pipeFlipTop + that.height))
          ) {
            console.log((Math.abs((that.pipeFlipTop + that.height) - parentClass.birdClass.top)));
            clearInterval(parentClass.gameLoop);
          }
          break;

        case 1:
          if ((Math.abs(that.pipeLeft1 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (Math.abs((that.pipeTop) - parentClass.birdClass.top) <= parentClass.birdClass.height)
          ) {
            console.log('collision');
            clearInterval(parentClass.gameLoop);
          }
          break;

        case 2:
          if ((Math.abs(that.pipeLeft2 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (parentClass.birdClass.top) <= ((that.pipeFlipTop + that.height))
            ) {
            console.log((Math.abs((that.pipeFlipTop + that.height) - parentClass.birdClass.top)));
            clearInterval(parentClass.gameLoop);
          }
          break;

        case 3:
          if ((Math.abs(that.pipeLeft2 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (Math.abs((that.pipeTop) - parentClass.birdClass.top) <= parentClass.birdClass.height)
          ) {
            console.log('collision');
            clearInterval(parentClass.gameLoop);
          }
          break;

      }


      // }
    }
  }

  this.runPipe = function () {
    this.movePipe();
    this.drawPipe();
    this.resetPipe();
    this.checkCollision();
  }




}