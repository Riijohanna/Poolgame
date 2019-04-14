var board = document.getElementById("board");

var ctx = board.getContext("2d");

//drawing rectangle
ctx.fillStyle = "#008000";
ctx.rect(40,40,800,400);
ctx.fillRect(40,40, 800, 400);

//drawing holes
//top left hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(39, 39, 30, 0, 2*Math.PI);
ctx.fill();

//top center hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(437, 40, 32, 0, 2*Math.PI);
ctx.fill();

//top right hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(835, 39, 30, 0, 2*Math.PI);
ctx.fill();

//bottom left hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(39, 435, 30, 0, 2*Math.PI);
ctx.fill();

//bottom center hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(437, 435, 32, 0, 2*Math.PI);
ctx.fill();

//bottom right holes
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(835, 435, 30, 0, 2*Math.PI);
ctx.fill();
