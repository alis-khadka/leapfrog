var body = document.getElementById('main');

function box(width, height, boxNum, boundaryLength, ant) {
  this.boundaryLength = boundaryLength || 600;
  this.x;
  this.y;
  this.width = width;
  this.height = height;
  this.boxNum = boxNum || 20;
  this.boxesPosition = [];
  this.boxes = [];
  this.tempPosition = {};
  this.displacement = 0.5;
  this.displacements = [];
  this.displacementss = [];
  this.simulate;
  this.ant = ant || false;

  var that = this;
  var heading = document.createElement('h2');
  var boxBoundary = document.createElement('div');
  
  body.appendChild(heading);
  heading.setAttribute('align', 'center');
  body.appendChild(boxBoundary);
  boxBoundary.style.width = this.boundaryLength + 'px';
  boxBoundary.style.height = this.boundaryLength + 'px';
  boxBoundary.style.border = '1px solid black';
  boxBoundary.style.margin = '0 auto';
  boxBoundary.style.marginBottom = '20px';
  boxBoundary.style.position = 'relative';

  this.init = function () {
    that.genrateHeading();
    that.generateBoxPositon();
    that.initialize();

    that.simulate = setInterval(that.moveAndCollide, 10);
  }

  this.genrateHeading = function() {
    if (that.ant) {
      heading.textContent = 'Ant Smasher';
    } else {
      heading.textContent = 'Box Collision';
    }
  }

  this.generateBoxPositon = function () {

    // Checking whether the boxes overlapping
    for (var j = 0; j < that.boxNum; j++) {
      that.boxesPosition[j] = {
        x: that.randomg(0, that.boundaryLength - that.width),
        y: that.randomg(0, that.boundaryLength - that.height)
      };
      for (var k = 0; k < j; k++) {
        while (
          (Math.abs(that.boxesPosition[j].x - that.boxesPosition[k].x) < that.width) &&
          (Math.abs(that.boxesPosition[j].y - that.boxesPosition[k].y) < that.height)
        ) {

          that.boxesPosition[k] = {
            x: that.randomg(0, that.boundaryLength - that.width),
            y: that.randomg(0, that.boundaryLength - that.height)
          };

        }
      }
    }
  }

  this.initialize = function () {
    for (var i = 0; i < that.boxNum; i++) {
      var box = document.createElement('div');

      boxBoundary.appendChild(box);
      box.style.position = 'absolute';
      box.style.top = that.boxesPosition[i].y + 'px';
      box.style.left = that.boxesPosition[i].x + 'px';
      box.style.width = that.width + 'px';
      box.style.height = that.height + 'px';
      box.style.cursor = 'pointer';

      if (that.ant) {
        box.style.backgroundImage = 'url(../images/ant-new.gif)';
        box.style.backgroundPosition = 'center';
        box.style.backgroundRepeat = 'no-repeat';
        box.style.backgroundSize = 'contain';
      } else {
        box.style.backgroundColor = 'red';
      }

      that.boxes[i] = box;

      if (that.ant) {
        that.removeCurrentBox(box); 
      }

      that.displacements[i] = {
        x: that.displacement,
        y: that.displacement
      };
      that.displacementss[i] = that.displacement;
    }

  }

  this.removeCurrentBox = function (currentBox) {
    currentBox.addEventListener('click', function() {
      boxBoundary.removeChild(currentBox);
    });
  }

  this.randomg = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  this.moveAndCollide = function () {
    for (var j = 0; j < that.boxNum; j++) {
      that.boxesPosition[j].x += that.displacements[j].x;
      that.boxesPosition[j].y += that.displacements[j].y;
    }

    that.drawBox();

    for (var j = 0; j < that.boxNum; j++) {
      for (var k = 0; k < j; k++) {
        if (
          ((Math.abs(that.boxesPosition[j].x - that.boxesPosition[k].x) <= that.width) &&
            (Math.abs(that.boxesPosition[j].y - that.boxesPosition[k].y) <= that.height))
        ) {
          // clearInterval(that.simulate);
          var decision = Math.random();
          if (decision < 0.5) {
            that.displacements[j].x = -that.displacements[j].x;
            that.displacements[k].x = -that.displacements[k].x;
          } else {
            that.displacements[j].y = -that.displacements[j].y;
            that.displacements[k].y = -that.displacements[k].y;
          }
        }
      }

      if (
        (Math.abs(that.boxesPosition[j].x + that.width) >= that.boundaryLength) ||
        ((that.boxesPosition[j].x) <= 0)
      ) {
        that.displacements[j].x = -that.displacements[j].x;
      } else if (
        ((that.boxesPosition[j].y) <= 0) ||
        (Math.abs(that.boxesPosition[j].y + that.height) >= that.boundaryLength)
      ) {
        that.displacements[j].y = -that.displacements[j].y;
      }
    }
  }

  this.drawBox = function () {
    for (i = 0; i < that.boxNum; i++) {
      that.boxes[i].style.left = that.boxesPosition[i].x + 'px';
      that.boxes[i].style.top = that.boxesPosition[i].y + 'px';
    }
  }

}

var box1 = new box(30, 30, 5, 400).init();
var box2 = new box(30, 20, 50, 600, 'ant').init();