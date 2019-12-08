class Laser {
  constructor(startX, startY, targetX, targetY) {
    this.x = startX;
    this.y = startY;
    this.speed = 8;
    this.r = 16;
    this.xSpeed = get_x_speed(this.speed, startX, startY, targetX, targetY);
    this.ySpeed = get_y_speed(this.speed, startX, startY, targetX, targetY);
  }

  // Update the location
  fly() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }

  display() {
    push();
    fill(color("#FE346E"));
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }
}

function get_x_speed(speed, sX, sY, tX, tY) {
  return (speed * (tX - sX)) / sqrt(sq(sX - tX) + sq(sY - tY));
}

function get_y_speed(speed, sX, sY, tX, tY) {
  return (speed * (tY - sY)) / sqrt(sq(sX - tX) + sq(sY - tY));
}

function tie_random_x() {
  let tempArray = random([
    [-70, 0],
    [width, width + 70]
  ]);
  return random(tempArray[0], tempArray[1]);
}

function tie_random_y() {
  let tempArray = random([
    [-70, 0],
    [height, height + 70]
  ]);
  return random(tempArray[0], tempArray[1]);
}

function tie_random_x_speed(x) {
  // x is the starting x location of TIE
  if (x <= 0) {
    return random(1, 3);
  } else {
    return random(-3, -1);
  }
}

function tie_random_y_speed(y) {
  // y is the starting y location of TIE
  if (y <= 0) {
    return random(1, 3);
  } else {
    return random(-3, -1);
  }
}

function overlap(l, t) {
  // l is a Laser object
  // t is a Tie object
  if (distance([l.x, l.y], [t.x, t.y]) > l.r / 2 + t.w) {
    // Not shot
    return false;
  } else {
    return true;
  }
}

function distance(a, b) {
  return sqrt(sq(a[0] - b[0]) + sq(a[1] - b[1]));
}
