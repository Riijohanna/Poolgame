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
ctx.arc(40, 40, 22, 0, 2*Math.PI);
ctx.fill();

//top center hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(438, 40, 24, 0, 2*Math.PI);
ctx.fill();

//top right hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(838, 38, 24, 0, 2*Math.PI);
ctx.fill();

//bottom left hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(38, 438, 24, 0, 2*Math.PI);
ctx.fill();

//bottom center hole
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(438, 440, 24, 0, 2*Math.PI);
ctx.fill();

//bottom right holes
ctx.fillStyle = "#000000";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(838, 438, 24, 0, 2*Math.PI);
ctx.fill();
