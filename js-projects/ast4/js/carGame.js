var parentNodes = document.getElementsByClassName('game');

var GAME_CONTAINER_HEIGHT = 1000;
var HIGH_SCORE = 0;
var currentScore = 0;

for (var i = 0; i < parentNodes.length; i++) {
  var gameContainer = document.createElement('div');
  parentNodes.item(i).appendChild(gameContainer);

  gameContainer.style.width = '600px';
  gameContainer.style.height = GAME_CONTAINER_HEIGHT + 'px';
  gameContainer.style.backgroundColor = 'black';
  gameContainer.style.position = 'relative';
  gameContainer.style.margin = '0 auto';
  gameContainer.style.overflow = 'hidden';
  gameContainer.style.textAlign = 'center';

  var game = new StartGame(parentNodes.item(i), gameContainer).init();
}

function StartGame(parentNode, gameContainer) {
  var that = this;
  this.parentNode = parentNode;
  that.gameContainer = gameContainer;
  this.startMsg;
  this.startGame;
  this.endMsg;
  this.playerScore;

  this.init = function () {
    that.startMsg = document.createElement('h1');
    that.startMsg.style.color = 'white';
    that.startMsg.style.textAlign = 'center';
    that.startMsg.style.fontSize = '50px';

    that.gameContainer.appendChild(that.startMsg);
    that.startMsg.textContent = 'Can you beat the highscore?';
    that.startGame = document.createElement('button');
    that.startGame.textContent = 'Start Game';
    that.startGame.style.height = '5%';
    that.startGame.style.width = '20%';
    that.startGame.style.margin = '0 auto';
    that.startGame.style.fontSize = '18px';
    that.startGame.style.cursor = 'pointer';
    that.gameContainer.appendChild(that.startGame);

    that.startGame.onclick = function () {
      that.gameContainer.removeChild(that.startMsg);
      that.gameContainer.removeChild(that.startGame);

      new CarGame(this.parentNode, that.gameContainer).init();
    }


  }

  this.reInit = function () {
    that.endMsg = document.createElement('h1');
    that.endMsg.style.color = 'white';
    that.endMsg.style.textAlign = 'center';
    that.endMsg.style.fontSize = '50px';
    that.endMsg.textContent = 'Play again?';
    that.endMsg.style.position = 'absolute';
    that.endMsg.style.top = '400px';
    that.endMsg.style.left = '200px';
    that.endMsg.style.color = 'black';

    that.gameContainer.appendChild(that.endMsg);

    that.startGame = document.createElement('button');
    that.startGame.textContent = 'OK';
    that.startGame.style.height = '5%';
    that.startGame.style.width = '20%';
    that.startGame.style.margin = '0 auto';
    that.startGame.style.fontSize = '18px';
    that.startGame.style.cursor = 'pointer';
    that.startGame.style.position = 'absolute';
    that.startGame.style.top = '500px';
    that.startGame.style.left = '250px';
    that.gameContainer.appendChild(that.startGame);

    that.playerScore = document.createElement('h2');
    that.playerScore.textContent = 'Your Score: ' + currentScore;
    that.playerScore.style.textAlign = 'center';
    that.playerScore.style.fontSize = '35px';
    that.playerScore.style.position = 'absolute';
    that.playerScore.style.top = '200px';
    that.playerScore.style.left = '200px';
    that.playerScore.style.color = 'black';
    that.gameContainer.appendChild(that.playerScore);

    that.currentHighScore = document.createElement('h2');
    that.currentHighScore.textContent = 'HighScore: ' + HIGH_SCORE;
    that.currentHighScore.style.textAlign = 'center';
    that.currentHighScore.style.fontSize = '35px';
    that.currentHighScore.style.position = 'absolute';
    that.currentHighScore.style.top = '300px';
    that.currentHighScore.style.left = '200px';
    that.currentHighScore.style.color = 'black';
    that.gameContainer.appendChild(that.currentHighScore);


    that.startGame.onclick = function () {
      that.gameContainer.removeChild(that.endMsg);
      that.gameContainer.removeChild(that.startGame);
      that.gameContainer.removeChild(that.playerScore);
      that.gameContainer.removeChild(that.currentHighScore);

      new CarGame(this.parentNode, that.gameContainer).init();
    }
  }
}

function CarGame(parentNode, gameContainer) {
  var that = this;

  this.gameContainer = gameContainer;
  this.parentNode = parentNode;

  this.road;
  this.roadTop = -8640;
  this.roadSpeed = 5;

  this.scoreHeading;
  this.remainingBulletHeading;
  this.highScoreHeading;

  this.player;
  this.playerTopPosition = 780;
  this.playerLeft = 55;
  this.playerMiddle = 235;
  this.playerRight = 415;
  this.playerLane = 235;
  this.playerScore = 0;

  this.bullets = [];
  this.bullet;
  this.bulletNum = 10;
  this.makeBullets = true;
  this.minBulletOffset = 67;
  this.bulletTopPosition = 780;
  this.currentBullet;
  this.toShoot = false;
  this.BULLET_WIDTH = 20;
  this.BULLET_LENGTH = 50;
  this.bulletLane;

  this.powerUp;
  this.powerUpInitialTop = 9;
  this.powerUpTop;
  this.powerUpLane;

  this.maxOpponent = 2;
  this.opponent;
  this.opponents = [];
  this.numOpponent = 0;
  this.opponentsTopPosition = [];
  this.opponentsLane = [];
  this.opponentInitialTopPosition = 9;
  this.OPPONENT_SPEED = 5.3;
  this.opponentPassed = true;
  this.opponentSpawnNum;

  this.speedIncrease = 10;

  this.CAR_LENGTH = 200;
  this.CAR_WIDTH = 150;

  this.simulate;

  this.init = function () {
    console.log(that.gameContainer)
    that.road = document.createElement('div');
    that.gameContainer.appendChild(that.road);
    that.road.style.backgroundPosition = 'center';
    // that.road.style.backgroundRepeat = 'no-repeat';
    that.road.style.backgroundRepeat = 'repeat-y';
    that.road.style.backgroundImage = 'url("../images/road1.png")';
    that.road.style.backgroundSize = '100%';
    that.road.style.position = 'absolute';
    that.road.style.overflow = 'hidden';
    that.road.style.height = '9600px';
    that.road.style.width = '540px';
    that.road.style.left = '30px';
    that.road.style.top = that.roadTop + 'px';

    that.scoreHeading = document.createElement('h3');
    that.gameContainer.appendChild(that.scoreHeading);
    that.scoreHeading.style.position = 'absolute';
    that.scoreHeading.style.textAlign = 'left';
    that.scoreHeading.style.color = 'white';
    that.scoreHeading.style.left = '50px';

    that.remainingBulletHeading = document.createElement('h3');
    that.gameContainer.appendChild(that.remainingBulletHeading);
    that.remainingBulletHeading.style.position = 'absolute';
    that.remainingBulletHeading.style.textAlign = 'left';
    that.remainingBulletHeading.style.color = 'white';
    that.remainingBulletHeading.style.left = '200px';

    that.highScoreHeading = document.createElement('h3');
    that.gameContainer.appendChild(that.highScoreHeading);
    that.highScoreHeading.textContent = 'High Score: ' + HIGH_SCORE;
    that.highScoreHeading.style.position = 'absolute';
    that.highScoreHeading.style.left = '400px';
    that.highScoreHeading.style.textAlign = 'right';
    that.highScoreHeading.style.color = 'white';

    that.player = document.createElement('div');
    that.gameContainer.appendChild(that.player);
    that.player.style.backgroundImage = 'url(../images/carPlayer.png)';
    that.player.style.height = that.CAR_LENGTH + 'px';
    that.player.style.width = that.CAR_WIDTH + 'px';
    that.player.style.backgroundSize = 'contain';
    that.player.style.backgroundRepeat = 'no-repeat';
    that.player.style.backgroundPosition = 'center';
    that.player.style.position = 'absolute';
    that.player.style.top = that.playerTopPosition + 'px';

    that.simulate = setInterval(that.runCarGame, 30);

  }

  this.runCarGame = function () {
    that.generateScore();
    that.generateRemainingBulletHeading();
    that.generateHighScoreHeading();
    that.moveRoad();

    if (that.makeBullets && that.bulletNum) {
      that.generateBullet();
    }

    that.movePlayer();
    that.drawPlayer();

    if (that.toShoot) {
      that.shootBullet();
    }

    if (that.opponentPassed) {
      that.opponentPassed = false;
      if (!that.bulletNum) {
        that.generatePowerUp();
      }
      
      if (that.opponents.length == 0) {
        if (Math.random() < 0.5){
          that.opponentSpawnNum = 2;
        } else {
          that.opponentSpawnNum = 1;
        }
      } else {
        that.opponentSpawnNum = 1;
      }
      that.generateOpponents(that.opponentSpawnNum);
    }

    that.moveOpponents();
    that.movePowerUp();
    that.playerGetPowerUp();
    that.isGameOver();

    if (that.bulletNum) {
      // that.isBulletHitOpponent();
      that.isBulletPassed();
    }

    that.isOpponentPassed();

  }

  this.generateScore = function () {
    that.scoreHeading.textContent = 'Your Score: ' + that.playerScore;
  }

  this.generateRemainingBulletHeading = function () {
    that.remainingBulletHeading.textContent = 'Remaing Bullets: ' + (that.bulletNum);
  }

  this.generateHighScoreHeading = function () {
    that.highScoreHeading.textContent = 'High Score: ' + HIGH_SCORE;
  }

  this.moveRoad = function () {

    that.roadTop += that.roadSpeed;
    that.road.style.top = that.roadTop + 'px';

    if (that.roadTop > -1) {
      that.roadTop = -8640;
    }

  }

  this.movePlayer = function () {
    document.onkeypress = function (event) {
      //To move car Left
      if (event.keyCode == 97) {
        switch (that.playerLane) {
          case that.playerLeft:
            that.playerLane = that.playerLeft;
            console.log(that.playerLane);
            break;

          case that.playerMiddle:
            that.playerLane = that.playerLeft;
            console.log(that.playerLane);
            break;

          case that.playerRight:
            that.playerLane = that.playerMiddle;
            console.log(that.playerLane);
            break;
        }
      }

      //To move car Right
      if (event.keyCode == 100) {
        switch (that.playerLane) {
          case that.playerLeft:
            that.playerLane = that.playerMiddle;
            console.log(that.playerLane);
            break;

          case that.playerMiddle:
            that.playerLane = that.playerRight;
            console.log(that.playerLane);
            break;

          case that.playerRight:
            that.playerLane = that.playerRight;
            console.log(that.playerLane);
            break;
        }
      }

      //Shoot Bullet
      if (event.keyCode == 32) {
        console.log('spacebar');
        that.toShoot = true;

      }
    }
  }

  this.drawPlayer = function () {
    that.player.style.left = that.playerLane + 'px';
    if (!that.toShoot) {
      that.bulletLane = that.playerLane + that.minBulletOffset;
      that.bullet.style.left = that.bulletLane + 'px';
    }

  }

  this.generateBullet = function () {

    that.bullet = document.createElement('div');
    that.gameContainer.appendChild(that.bullet);
    that.bullet.style.backgroundImage = 'url(../images/bullet.png)';
    that.bullet.style.backgroundSize = 'contain';
    that.bullet.style.backgroundRepeat = 'no-repeat';
    that.bullet.style.backgroundPosition = 'center';
    that.bullet.style.position = 'absolute';
    that.bullet.style.width = that.BULLET_WIDTH + 'px';
    that.bullet.style.height = that.BULLET_LENGTH + 'px';
    that.bullet.style.top = that.bulletTopPosition + 'px';
    that.bullets.push(that.bullet);
    that.currentBullet = that.bullet;
    // that.bullet.style.left = (that.playerLane + that.minBulletOffset) + 'px';
    // that.bullets[i] = that.bullet;


    that.makeBullets = false;
  }

  this.generatePowerUp = function () {
    that.isTherePowerUp = true;

    that.powerUp = document.createElement('div');
    that.powerUp.style.backgroundImage = 'url(../images/powerUp.png)';
    that.powerUp.style.backgroundPosition = 'center';
    that.powerUp.style.backgroundRepeat = 'no-repeat';
    that.powerUp.style.backgroundSize = 'contain';

    that.powerUp.style.height = that.CAR_LENGTH + 'px';
    that.powerUp.style.width = that.CAR_WIDTH + 'px';
    
    that.powerUp.style.position = 'absolute';
    that.powerUpTop = that.powerUpInitialTop;
    that.powerUp.style.top = that.powerUpTop + 'px';
    that.powerUpLane = that.randomOpponentPosition();
    that.powerUp.style.left = that.powerUpLane + 'px';
    
    that.gameContainer.appendChild(that.powerUp);
  }

  this.shootBullet = function () {
    that.bulletTopPosition -= 10;
    that.bullet.style.top = that.bulletTopPosition + 'px';

  }

  this.generateOpponents = function (opponentSpawnNum) {

    for (var i = 0; i < opponentSpawnNum; i++) {
      that.opponent = document.createElement('div');
      that.opponent.style.backgroundImage = 'url("../images/opponentCar1.png")';
      that.opponent.style.height = that.CAR_LENGTH + 'px';
      that.opponent.style.width = that.CAR_WIDTH + 'px';
      that.opponent.style.backgroundSize = 'contain';
      that.opponent.style.backgroundRepeat = 'no-repeat';
      that.opponent.style.backgroundPosition = 'center';

      that.opponent.style.position = 'absolute';
      that.opponentsTopPosition[i] = that.opponentInitialTopPosition;

      that.opponent.style.top = that.opponentsTopPosition[i] + 'px';
      that.opponentsLane[i] = that.randomOpponentPosition();

      // To make sure 2 opponents don't spawn in same lane
      while (that.opponentsLane[i] == that.opponentsLane[i - 1]) {
        that.opponentsLane[i] = that.randomOpponentPosition();
      }

      that.opponent.style.left = that.opponentsLane[i] + 'px';
      that.numOpponent++;


      that.gameContainer.appendChild(that.opponent);
      that.opponents[i] = that.opponent;
      // console.log('no of opponent', that.opponents.length);
      // console.log(that.opponents);


    }

    // console.log('Opponent Spawn no:', opponentSpawnNum);

  }

  this.randomOpponentPosition = function () {
    var randNum = Math.random();

    if (randNum <= 0.3) {
      return that.playerLeft;
    } else if (randNum > 0.3 && randNum <= 0.7) {
      return that.playerMiddle;
    } else if (randNum > 0.7) {
      return that.playerRight;
    }

  }

  this.moveOpponents = function () {
    for (var i = 0; i < that.opponents.length; i++) {
      that.opponentsTopPosition[i] += that.OPPONENT_SPEED;
      that.opponents[i].style.top = that.opponentsTopPosition[i] + 'px';
    }
  }

  this.movePowerUp = function () {
    if (that.isTherePowerUp) {
      that.powerUpTop += that.OPPONENT_SPEED;
      that.powerUp.style.top = that.powerUpTop + 'px';
    }
  }

  this.playerGetPowerUp = function () {
    if (
      (Math.abs(that.powerUpTop - that.playerTopPosition) < that.CAR_LENGTH) &&
      (Math.abs(that.powerUpLane - that.playerLane) < that.CAR_WIDTH)
    ) {
      that.bulletNum = 10;
      that.gameContainer.removeChild(that.powerUp);
    }
  }

  this.isGameOver = function () {

    for (var i = 0; i < that.opponents.length; i++) {

      if (
        (Math.abs(that.opponentsTopPosition[i] - that.playerTopPosition) < that.CAR_LENGTH) &&
        (Math.abs(that.opponentsLane[i] - that.playerLane) < that.CAR_WIDTH)
      ) {
        clearInterval(that.simulate);
        console.log('collision');

        currentScore = that.playerScore;

        that.clearGame();

        new StartGame(this.parentNode, that.gameContainer).reInit();
      }

    }
  }

  this.isBulletHitOpponent = function () {
    for (var i = 0; i < that.opponents.length; i++) {


      if (
        (Math.abs(that.opponentsTopPosition[i] - that.bulletTopPosition) < (that.CAR_LENGTH-that.BULLET_LENGTH)) &&
        (Math.abs(that.opponentsLane[i] - that.bulletLane) < that.CAR_WIDTH)
      ) {
        console.log('BULLET HIT');
        that.gameContainer.removeChild(that.opponents[i]);
        that.gameContainer.removeChild(that.bullet);
        
      }
    }
  }

  this.isOpponentPassed = function () {
    // var length = that.opponents.length;
    for (var i = 0; i < that.opponentSpawnNum; i++) {

      if (
        (Math.abs(that.opponentsTopPosition[i]) >= GAME_CONTAINER_HEIGHT)
      ) {
        that.playerScore += that.opponents.length;
        console.log('Score: ', that.playerScore);

        if (that.playerScore > HIGH_SCORE) {
          HIGH_SCORE = that.playerScore;
        }

        console.log('Opponent passed');
        that.opponentsTopPosition[i] = 0;
        that.opponentsLane[i] = 0;

        var currentOpponent = that.opponents[i];
        that.removeCurrentOpponent(currentOpponent);
        // that.gameContainer.removeChild(that.opponents[i]);

        that.opponents.splice(that.opponents.indexOf(that.opponents[i]), 1);
        console.log('no opponent after removing: ', that.opponents.length);
        console.log(that.opponents);
        that.opponentPassed = true;
        console.log('Opponent passed: ', that.opponentPassed);

        if (that.playerScore >= that.speedIncrease) {
          that.OPPONENT_SPEED += 5;
          that.speedIncrease += 10;
          that.roadSpeed += 5;
          console.log('speed: ', that.OPPONENT_SPEED);
        }
      }
    }
  }

  this.isBulletPassed = function () {
    if (that.bulletTopPosition <= 0) {
      that.toShoot = false;
      that.makeBullets = true;
      console.log(that.toShoot);
      that.gameContainer.removeChild(that.bullet);
      that.bulletTopPosition = 780;
      that.bulletNum -= 1;
      console.log('bullet remaining: ', that.bulletNum);



    }
  }


  this.removeCurrentOpponent = function (currentOpponent) {
    that.gameContainer.removeChild(currentOpponent);
  }

  this.randomg = function (min, max) {
    var randNum = Math.random();

    if (randNum <= 0.5) {
      return min;
    } else {
      return max;
    }
  }

  this.clearGame = function () {
    for (var i = 0; i < that.opponents.length; i++) {
      that.removeCurrentOpponent(that.opponents[i]);
    }

    that.gameContainer.removeChild(that.scoreHeading);
    that.gameContainer.removeChild(that.highScoreHeading);
    that.roadTop = -8540;
    that.road.style.top = that.roadTop + 'px';
    // that.gameContainer.removeChild(that.road);
  }

}
