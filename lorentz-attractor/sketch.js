let x = 0.01,
  y = 0,
  z = 0;
let a = 10,
  b = 28,
  c = 8 / 3; // constants

let de = 0;
let points = [];

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  if (de > 360) {
    de = de % 360;
  }
  de += 0.01;
  background(0);
  // translate(0, 0, );
  // rotateX(de);
  rotateY(de);
  // rotateZ(de / 2);
  let dt = 0.01;
  let dx = a * (y - x) * dt;
  x += dx;
  let dy = (x * (b - z) - y) * dt;
  y += dy;
  let dz = (x * y - c * z) * dt;
  z += dz;

  noFill();
  points.push(createVector(x, y, z));
  scale(5);

  beginShape();
  points.forEach((point) => {
    stroke(0, 255, 255);
    vertex(point.x, point.y, point.z);
  });
  endShape(CLOSE);
}
