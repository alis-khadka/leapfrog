function Bird(height, width, parentClass) {
  var that = this;

  this.height = height;
  this.width = width;

  this.initialTop = (parentClass.height - this.height) / 2;
  this.top = this.initialTop;
  this.left = (parentClass.width - this.width) / 2;

  this.jumpOffset = 55;

  // this.hitAudio = new Audio('./audio/hit.wav');
  // this.dieAudio = new Audio('./audio/die.wav');

  this.birdMoveOffset = 80;
  this.birdAnimationSpeed = 4;

  this.moveRotateAngle = -35;

  this.gravityEffectIntervalId;
  this.dropByGravity = 0.01;
  this.dropIncreaseBy = 0.09;
  this.MAX_DROP_RATE = 0.25;
  this.gravityEffectIntervalTime = 10;

  this.zIndex = 50;

  this.animateId;

  this.bird;
  this.imageContainer;

  this.init = function () {
    that.bird = document.createElement('div');

    that.bird.style.position = 'absolute';

    that.bird.id = 'bird';

    that.bird.style.top = this.top + 'px';
    that.bird.style.left = this.left + 'px';

    that.bird.style.zIndex = this.zIndex;

    that.bird.style.height = this.height + 'px';
    that.bird.style.width = this.width + 'px';

    that.imageContainer = document.createElement('div');
    that.imageContainer.style.width = this.width + 'px';
    that.imageContainer.style.height = this.height + 'px';
    that.imageContainer.style.backgroundImage = 'url(./images/flappy_bird.gif)';
    that.imageContainer.style.backgroundSize = '100% 100%';

    that.bird.appendChild(this.imageContainer);

    // this.gravityEffect();

    return this.bird;
  }

  this.runBird = function () {
    // that.moveBird();
    that.initKeyEvent();
    that.gravityPull();
  }

  this.moveBird = function () {
    that.imageContainer.style.backgroundImage = 'url(./images/flappy_bird.gif)';
    that.imageContainer.style.trandform = 'rotate(' + that.moveRotateAngle + 'deg)';
  }

  this.initKeyEvent = function () {
    document.onkeypress = function (event) {
      if (event.keyCode == 32) {
        that.jumpBird();
      }
    }
  }

  this.jumpBird = function () {
    var currentTop = that.top;
    var targetTop = currentTop - that.jumpOffset;

    that.flyBird(currentTop, targetTop);
  }

  this.flyBird = function (currentTop, targetTop) {
    while (currentTop >= targetTop) {
      currentTop -= 6;
      that.drawBird(currentTop);
    }
  }

  this.drawBird = function (currentTop) {
    that.top = currentTop || that.top;;
    that.bird.style.top = that.top + 'px';
  }

  this.gravityPull = function () {
    that.top += 6;
    this.drawBird();
  }

}