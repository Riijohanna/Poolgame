
// add comments where source code was taken and it was changed by me

var ball;
var balls = [];
var colors = ["#f30505", "#3333cc", "#f30505", "#3333cc", "#f30505",
  "#f30505", "#3333cc", "#3333cc", "#f30505", "#3333cc", "black", "#3333cc",
  "#f30505",
  "#f30505", "#3333cc",
];




var holes = [];
var cnv;


var button;
function setup() {
  cnv = createCanvas(600, 350);



  cnv.parent('sketch-holder'); // PLACE HOLDER FOR CANVAS
  ball = new WhiteBall(width - 100, height / 2, 35, 45);  //ball = new WhiteBall(width - 100, height / 2, 20, 45);
  balls.push(ball);

  let offset = 0;
  let c = 0;
  let ballR = 30; // RADIUS OF BALLS 18
  //generate balls in triangle
  for (var i = 0; i < 5; i++) { // VERTICAL LINES
    for (var j = 5 - i; j > 0; j--) { //HORIZONTAL LINES
      let b = new Ball(100 + i * ballR + i, j * ballR - (ballR * 5) / 2 + offset - ballR / 2 + height / 2 + j, ballR, colors[c]); //TRIANGLE. HERE WE LET COLORS GO TO ARRAY
      balls.push(b);
      c++;
			console.log(balls[11]); //Black COLOR BALL

    }
    offset += ballR / 2 + 1;

  }

  holes.push(new Hole(0, 0)); //positin up-left hole
  holes.push(new Hole(width, 0)); // up-right
  holes.push(new Hole(width / 2, 0)); // middle up
  holes.push(new Hole(width / 2, height)); // middel down
  holes.push(new Hole(0, height)); //down left
  holes.push(new Hole(width, height)); //down right

}

//-----------------------------------------------------------------------------
function draw() {
  background("green");
  for (var hole of holes) {
    hole.render();
  }
  rectMode(CENTER, CENTER);

  fill("green");
  rect(width - 100, height / 2, 28, 20);

//
  for (var j = 0; j < holes.length; j++) {
    for (var i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if (ball.inHole) continue;
      ball.checkCollisionWithHole(holes[j]);
        //----balls[1] - FIRST Ball
        //----balls[15] - LAST BALL


			if (balls[11].inHole ) {
            if (balls[1].inHole & balls[2].inHole & balls[3].inHole & balls[4].inHole & balls[5].inHole & balls[6].inHole & balls[7].inHole & balls[8].inHole & balls[9].inHole & balls[10].inHole & balls[12].inHole & balls[13].inHole & balls[14].inHole & balls[15].inHole) {
              document.getElementById("notificationText").innerHTML = "U win! Good job! Well DOne!!!!!!11111";
            } else {
              document.getElementById("notificationText").innerHTML = "You lost! Game is gonna be restarted in awhile";
              setTimeout(function() {
                location.reload(); //---REFRESH IFRAME PAGE IN % SEC TO PLAY NEW GAME--------------
              }, 5000);


            break; // after BLACK BALL IN HOLE, U CANT PUT OTHER BALL IN HOLES
            }
			}
    }

  }

  for (var ball of balls) {
    if (ball.inHole) continue;
    for (let i = 0; i < balls.length; i++) {

      let test = balls[i];
      if (test.inHole) continue;
      if (ball === test) continue;
      ball.checkCollision(test);
    }
  }
  for (var ball of balls) {
    if (ball.inHole) continue;
    ball.update();
    ball.render();
  }
  stroke(255); //color from mouse to whote ball
  line(balls[0].position.x, balls[0].position.y, mouseX, mouseY); //white LINE white ball
  stroke(0);

  line(balls[0].position.x, balls[0].position.y, -mouseX, -mouseY, 10); // TEST BLACK LINE
}

//--------------------------------------------------------------------------

function mousePressed() {
  if (ball.velocity.mag() > 0.1) return;
  let dx = mouseX - ball.position.x;
  let dy = mouseY - ball.position.y;
  let angle = Math.atan2(dy, dx);
  let distance = Math.sqrt(dx * dx + dy * dy) / 10;
  let force = createVector(distance * cos(angle), distance * sin(angle), 0);
  force.limit(45);
  ball.applyForce(force);
}

//--------CLASS HOLE------------------------------

class Hole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get radius() {
    return 100; // RAIDUS OF HOLES 50
  }

  render() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, Hole.radius * .8, Hole.radius * .8); // MAKES THEM AS CIRCLE
  }

}



class PhysicsParticle {

  constructor(x, y, r, velocityLimit) {
    this.position = createVector(x, y, 0);
    this.acc = createVector(0, 0, 0);
    this.velocity = createVector(0, 0, 0);
    this.r = r;
    this.velocityLimit = velocityLimit || 30;
    this.friction = 0.968;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {

    this.velocity.add(this.acc);
    this.velocity.limit(this.velocityLimit);
    this.position.add(this.velocity);
    this.acc.mult(0);
    this.velocity.mult(this.friction);
    this.applyBounds();
  }

  checkCollision(b) {
    let dx = b.position.x - this.position.x;
    let dy = b.position.y - this.position.y;
    let d = this.position.dist(b.position);
    if (d <= (b.r / 2 + this.r / 2)) {
      this.computeCollision(b, dx, dy);
    }
  }

  computeCollision(b, dx, dy) {
    let speed = this.velocity.mag() * 0.8;
    let angle = atan2(dy, dx);
    b.applyForce(createVector(speed * cos(angle), speed * sin(angle)));
    this.velocity.mult(0.65);
  }

  applyBounds() {
    if (this.position.y + this.r / 2 >= height) {
      this.position.y = height - this.r / 2;
      this.applyForce(createVector(0, 2 * this.velocity.y * -1, 0));
    } else if (this.position.y < this.r / 2) {
      this.position.y = this.r / 2;
      this.applyForce(createVector(0, 2 * this.velocity.y * -1, 0));
    }
    if (this.position.x + this.r / 2 >= width) {
      this.position.x = width - this.r / 2;
      this.applyForce(createVector(2 * this.velocity.x * -1, 0, 0));
    } else if (this.position.x < this.r / 2) {
      this.position.x = this.r / 2;
      this.applyForce(createVector(2 * this.velocity.x * -1, 0, 0));
    }
  }


}



class Ball extends PhysicsParticle {

  constructor(x, y, r, _color, limit) {
    super(x, y, r, limit);
    this.color = _color || color(255); //255 IS A WHITE COLOR
    this.inHole = false;

  }

  checkCollisionWithHole(hole) {
    let dx = hole.x - this.position.x;
    let dy = hole.y - this.position.y;
    let d = Math.sqrt(dx * dx + dy * dy);
    if (d <= Hole.radius / 2 - this.r / 2) {
      this.inHole = true;
    }
  }


  render() {
    stroke(0);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

}

class WhiteBall extends Ball {
  constructor(x, y, r, limit) {
    super(x, y, r, limit);
    this.color = color(255); // COLOR OF WHITE BALL IS WHITE, heh
  }

  checkCollisionWithHole(hole) {
    let dx = hole.x - this.position.x;
    let dy = hole.y - this.position.y;
    let d = Math.sqrt(dx * dx + dy * dy);
    if (d <= Hole.radius / 2 - this.r / 2) {
      this.velocity.mult(0);
      this.position.set(width - 100, height / 2);
      this.acc.mult(0);
    }
  }
}