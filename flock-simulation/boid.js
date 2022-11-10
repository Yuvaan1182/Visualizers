class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxSteeringForce = 0.2;
    this.maxSpeed = 4;
  }

  bound() {
    if (this.position.x < 0) {
      this.position.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
  }

  align(boids) {
    let avgVel = createVector();
    let perspectiveRadii = 50;
    let cntNeighbors = 0;

    for (let boid of boids) {
      if (
        boid !== this &&
        dist(
          this.position.x,
          this.position.y,
          boid.position.x,
          boid.position.y
        ) < perspectiveRadii
      ) {
        avgVel.add(boid.velocity);
        cntNeighbors++;
      }
    }

    if (cntNeighbors > 0) {
      avgVel.div(cntNeighbors);
      avgVel.setMag(this.maxSpeed);
      avgVel.sub(this.velocity);
      avgVel.limit(this.maxSteeringForce);
    }

    return avgVel;
  }

  cohesion(boids) {
    let avgPos = createVector();
    let perspectiveRadii = 50;
    let cntNeighbors = 0;

    for (let boid of boids) {
      if (
        boid !== this &&
        dist(
          this.position.x,
          this.position.y,
          boid.position.x,
          boid.position.y
        ) < perspectiveRadii
      ) {
        avgPos.add(boid.position);
        cntNeighbors++;
      }
    }

    if (cntNeighbors > 0) {
      avgPos.div(cntNeighbors);
      avgPos.sub(this.position);
      avgPos.setMag(this.maxSpeed);
      avgPos.sub(this.velocity);
      avgPos.limit(this.maxSteeringForce);
    }

    return avgPos;
  }

  separation(boids) {
    let avgPos = createVector();
    let perspectiveRadii = 50;
    let cntNeighbors = 0;

    for (let boid of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      );
      if (boid !== this && d < perspectiveRadii) {
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.div(d);
        avgPos.add(diff);
        cntNeighbors++;
      }
    }

    if (cntNeighbors > 0) {
      avgPos.div(cntNeighbors);
      avgPos.setMag(this.maxSpeed);
      avgPos.sub(this.velocity);
      avgPos.limit(this.maxSteeringForce);
    }

    return avgPos;
  }

  allBoids(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
