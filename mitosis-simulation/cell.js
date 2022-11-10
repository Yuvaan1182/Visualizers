class Cell {
  constructor(pos, r, c) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(300, width), random(300, height));
    }

    this.radii = r || random(400, 500);
    this.col = c || color(0, random(50, 255), random(100, 200), 100);
  }

  clicked(x, y) {
    let d = dist(this.pos.x, this.pos.y, x, y);
    if (d < this.radii) {
      return true;
    } else {
      return false;
    }
  }

  mitosis() {
    this.pos.x += random((-1 * this.radii) / 2, this.radii / 2);

    let cell = new Cell(this.pos, this.radii / 2, this.col);
    return cell;
  }

  move() {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
  }

  show() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.radii, this.radii);
  }
}
