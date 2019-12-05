function Helix(canvasId, width, height, rows, columns, color1, color2) {
  var that = this;

  this.body =document.getElementById('main');


  this.init = function () {
    that.width = width;
    that.height = height;
    that.rows = rows;
    that.columns = columns;
    that.color1 = color1;
    that.color2 = color2;

    that.canvas;
    that.context;

    that.originX = 0;
    that.originY = 0;

    that.canvas = document.createElement('canvas');
    that.canvas.setAttribute('id', canvasId);
    that.canvas.width = that.width;
    that.canvas.height = that.height;

    
    document.body.appendChild(that.canvas);
    that.context = that.canvas.getContext('2d');

    that.circleController = new CircleController(that.context, that.rows, that.columns, that.color1, that.color2);

  }

  this.clearHelix = function () {
    that.context.clearRect(that.originX, that.originY, that.canvas.width, that.canvas.height);
    that.context.fillStyle = 'black';
    that.context.fillRect(that.originX, that.originY, that.canvas.width, that.canvas.height);
    that.circleController.draw();

  }

  this.runHelix = function () {
    that.clearHelix();

    requestAnimationFrame(that.runHelix.bind(that));

  }

  
  this.init();

}