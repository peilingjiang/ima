let galaxy; // Our background!
let millennium; // Our ship!
let tieFighters; // Empire's ships!

let newTie; // A counter deciding if send a new TIE into our space (canvas)

function preload() {
  galaxy = loadImage("assets/galaxy.jpg");
  millennium_photo = loadImage("assets/millennium.png");
  tie_photo = loadImage("assets/tie.png");
}

function setup() {
  createCanvas(600, 400);
  newTie = 0;
  tieFighters = [];
  millennium = new Player();
}

function draw() {
  // Move our ship around
  // Detect if key is down
  if (keyIsDown(87)) {
    // "W" is pressed
    millennium.up();
  } else if (keyIsDown(68)) {
    // "D" is pressed
    millennium.right();
  } else if (keyIsDown(83)) {
    // "S" is pressed
    millennium.down();
  } else if (keyIsDown(65)) {
    // "A" is pressed
    millennium.left();
  }

  // Send a new TIE every two seconds
  newTie += 1;
  if (newTie % 120 == 0) {
    tieFighters.push(new Tie());
  }

  // Update the locations of laser shot
  for (let l in millennium.laser) {
    millennium.laser[l].fly();
  }

  // Update the location of TIE Fighters
  for (let t in tieFighters) {
    tieFighters[t].fly();
  }

  // Check if any TIE is shot
  check_shot();

  // DRAW

  // Background
  image(galaxy, 0, 0, width, height);

  // Draw laser shot
  for (let l in millennium.laser) {
    millennium.laser[l].display();
  }

  // Draw TIE Fighters
  for (let t in tieFighters) {
    tieFighters[t].display();
  }

  // Draw our ship
  millennium.display();
}

class Player {
  constructor() {
    this.x = width / 2; // Starting x location of the ship
    this.y = height / 2; // Starting y location of the ship
    this.w = 70; // Width
    this.h = 70; // Height
    this.speed = 3;
    this.laser = []; // An array of Laser objects
  }

  // Move around
  up() {
    this.y = this.y - this.speed;
  }

  down() {
    this.y = this.y + this.speed;
  }

  left() {
    this.x = this.x - this.speed;
  }

  right() {
    this.x = this.x + this.speed;
  }

  // Shoot
  shoot(targetX, targetY) {
    this.laser.push(new Laser(this.x, this.y, targetX, targetY));
  }

  display() {
    push();
    imageMode(CENTER);
    image(millennium_photo, this.x, this.y, this.w, this.h);
    pop();
  }
}

class Tie {
  constructor() {
    this.x = tie_random_x(); // Starting x location of the ship
    this.y = tie_random_y(); // Starting y location of the ship
    this.w = 60; // Width
    this.h = 60; // Height
    this.xSpeed = tie_random_x_speed(this.x); // Speed on x axis
    this.ySpeed = tie_random_y_speed(this.y); // Speed on y axis
    this.toDisplay = true; // if true, then display
  }

  // Move
  fly() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }

  display() {
    if (this.toDisplay) {
      push();
      imageMode(CENTER);
      image(tie_photo, this.x, this.y, this.w, this.h);
      pop();
    }
  }
}

function check_shot() {
  // For every laser shot, check every TIE if they are overlapped with each other
  for (let l in millennium.laser) {
    for (let t in tieFighters) {
      if (overlap(millennium.laser[l], tieFighters[t])) {
        // Do not display the shot TIE in the future
        tieFighters[t].toDisplay = false;
      }
    }
  }
}

function mousePressed() {
  // Millennium will shoot to the direction the mouse is pressed
  millennium.shoot(mouseX, mouseY);
}
