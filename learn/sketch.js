function setup() {
  // parameters => width, height
  createCanvas(640, 480);
}

function draw() {
  // parameters => r, g, b or h, s, l or h, s, b
  background(12, 13, 45);

  // stroke is used for outline color of the shape drawn

  // /* always call the setting color function before
  // drawing shape. It's like which color pen you hold
  // for drawing.
  // */

  stroke(255, 255, 255, 1);

  // parameters => posx, posy, width, height
  rect(100, 20, 75, 150);

  stroke(255, 255, 12);

  // parameters => startx, starty, endx, endy
  line(11, 23, 110, 100);
}
