var parentNode = document.getElementById('game');
var gameContainer;
var GAME_CONTAINER_HEIGHT = 1000;
var HIGH_SCORE = 0;
var currentScore = 0;

gameContainer = document.createElement('div');
parentNode.appendChild(gameContainer);

gameContainer.style.width = '600px';
gameContainer.style.height = GAME_CONTAINER_HEIGHT + 'px';
gameContainer.style.backgroundColor = 'black';
gameContainer.style.position = 'relative';
gameContainer.style.margin = '0 auto';
gameContainer.style.overflow = 'hidden';
gameContainer.style.textAlign = 'center';

function StartGame(parentNode) {
  this.parentNode = parentNode;
  this.startMsg;
  this.startGame;
  this.endMsg;
  this.playerScore;
  var that = this;

  this.init = function () {
    that.startMsg = document.createElement('h1');
    that.startMsg.style.color = 'white';
    that.startMsg.style.textAlign = 'center';
    that.startMsg.style.fontSize = '50px';

    gameContainer.appendChild(that.startMsg);
    that.startMsg.textContent = 'Can you beat the highscore?';
    that.startGame = document.createElement('button');
    that.startGame.textContent = 'Start Game';
    that.startGame.style.height = '5%';
    that.startGame.style.width = '20%';
    that.startGame.style.margin = '0 auto';
    that.startGame.style.fontSize = '18px';
    that.startGame.style.cursor = 'pointer';
    gameContainer.appendChild(that.startGame);

    that.startGame.onclick = function () {
      gameContainer.removeChild(that.startMsg);
      gameContainer.removeChild(that.startGame);

      new CarGame(parentNode).init();
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

    gameContainer.appendChild(that.endMsg);

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
    gameContainer.appendChild(that.startGame);

    that.playerScore = document.createElement('h2');
    that.playerScore.textContent = 'Your Score: ' + currentScore;
    that.playerScore.style.textAlign = 'center';
    that.playerScore.style.fontSize = '35px';
    that.playerScore.style.position = 'absolute'; 
    that.playerScore.style.top = '200px';
    that.playerScore.style.left = '200px';
    that.playerScore.style.color = 'black';
    gameContainer.appendChild(that.playerScore);

    that.currentHighScore = document.createElement('h2');
    that.currentHighScore.textContent = 'HighScore: ' + HIGH_SCORE;
    that.currentHighScore.style.textAlign = 'center';
    that.currentHighScore.style.fontSize = '35px';
    that.currentHighScore.style.position = 'absolute'; 
    that.currentHighScore.style.top = '300px';
    that.currentHighScore.style.left = '200px';
    that.currentHighScore.style.color = 'black';
    gameContainer.appendChild(that.currentHighScore);


    that.startGame.onclick = function () {
      gameContainer.removeChild(that.endMsg);
      gameContainer.removeChild(that.startGame);
      gameContainer.removeChild(that.playerScore);
      gameContainer.removeChild(that.currentHighScore);

      new CarGame(parentNode).init();
    }
  }
}

function CarGame(parentNode) {
  this.parentNode = parentNode;

  this.road;
  this.roadTop = -8640;
  this.roadSpeed = 5;

  this.scoreHeading;
  this.highScoreHeading;

  this.player;
  this.playerTopPosition = 780;
  this.playerLeft = 55;
  this.playerMiddle = 235;
  this.playerRight = 415;
  this.playerLane = 235;
  this.playerScore = 0;

  this.maxOpponent = 2;
  this.opponent;
  this.opponents = [];
  this.numOpponent = 0;
  this.opponentsTopPosition = [];
  this.opponentsLane = [];
  this.opponentInitialTopPosition = 9;
  this.OPPONENT_SPEED = 5.3;
  this.opponentPassed = true;

  this.speedIncrease = 10;

  this.CAR_LENGTH = 200;
  this.CAR_WIDTH = 150;

  this.simulate;
  var that = this;

  this.init = function () {

    that.road = document.createElement('div');
    gameContainer.appendChild(that.road);
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
    gameContainer.appendChild(that.scoreHeading);
    that.scoreHeading.style.position = 'absolute';
    that.scoreHeading.style.textAlign = 'left';
    that.scoreHeading.style.color = 'white';
    that.scoreHeading.style.left = '50px';

    that.highScoreHeading = document.createElement('h3');
    gameContainer.appendChild(that.highScoreHeading);
    that.highScoreHeading.textContent = 'High Score: ' + HIGH_SCORE;
    that.highScoreHeading.style.position = 'absolute';
    that.highScoreHeading.style.left = '400px';
    that.highScoreHeading.style.textAlign = 'right';
    that.highScoreHeading.style.color = 'white';

    that.player = document.createElement('div');
    gameContainer.appendChild(that.player);
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
    that.generateHighScoreHeading();
    that.moveRoad();
    that.movePlayer();
    that.drawPlayer();

    if (that.opponentPassed) {
      that.opponentPassed = false;
      var opponentSpawnNum;

      if (Math.random() < 0.4) {
        opponentSpawnNum = 1;
      } else {
        opponentSpawnNum = 2;
      }
      that.generateOpponents(opponentSpawnNum);
    }

    that.moveOpponents();
    that.isGameOver();
    that.isOpponentPassed();

  }

  this.generateScore = function () {
    that.scoreHeading.textContent = 'Your Score: ' + that.playerScore;
  }

  this.generateHighScoreHeading = function () {
    that.highScoreHeading.textContent = 'High Score: ' + HIGH_SCORE;
  }

  this.moveRoad = function () {

    that.roadTop += that.roadSpeed;
    that.road.style.top = that.roadTop + 'px'; 

    if(that.roadTop > -1) {
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
    }
  }

  this.drawPlayer = function () {
    that.player.style.left = that.playerLane + 'px';
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


      gameContainer.appendChild(that.opponent);
      that.opponents[i] = that.opponent;
      console.log('no of opponent', that.opponents.length);
      console.log(that.opponents);


    }

    console.log('Opponent Spawn no:', opponentSpawnNum);

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

        new StartGame(parentNode).reInit();
      }

    }
  }

  this.isOpponentPassed = function () {

    for (var i = 0; i < that.opponents.length; i++) {

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

        that.opponents.splice(0, 2);
        console.log('no opponent after removing', that.opponents.length);
        console.log(that.opponents);
        that.opponentPassed = true;

        if (that.playerScore >= that.speedIncrease) {
          that.OPPONENT_SPEED += 5;
          that.speedIncrease += 10;
          that.roadSpeed +=5;
          console.log('speed: ', that.OPPONENT_SPEED);
        }
      }
    }
  }

  this.removeCurrentOpponent = function (currentOpponent) {
    gameContainer.removeChild(currentOpponent);
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

    gameContainer.removeChild(that.scoreHeading);
    gameContainer.removeChild(that.highScoreHeading);
    that.roadTop = -8540;
    that.road.style.top = that.roadTop + 'px';
    // gameContainer.removeChild(that.road);
  }

}

// var game = new CarGame(parentNode).init();
var game = new StartGame(parentNode).init();
// var game = new StartGame(parentNode).init();
// var game = new CarGame(parentNode).generateOpponents();