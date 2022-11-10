let cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 2; i++) {
    cells.push(new Cell());
  }
}

function draw() {
  background(21);

  for (let i = 0; i < cells.length; i++) {
    cells[i].move();
    cells[i].show();
  }
}

function mousePressed() {
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      // cells[i].mitosis(1);
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
      // print(i, "Got clicked");
    }
  }
}
