var canvasId = 'canvas1';
var width = 800;
var height = 400;
var rows = 10;
var columns = 30;
var color1 = 'white';
var color2 = 'blue';

var helix = new Helix('canvas1', width, height, rows, columns, color1, color2);
// var helix = new Helix('canvas2', width, height, rows, columns, color1, color2);

// helix.init();
helix.runHelix();