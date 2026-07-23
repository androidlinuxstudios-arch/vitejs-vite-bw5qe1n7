// laser.js

export class Laser {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 12;
    this.width = 4;
    this.height = 18;
    this.active = true;
  }

  update() {
    this.y -= this.speed;

    if (this.y < -30) {
      this.active = false;
    }
  }

  draw(ctx) {

    ctx.save();

    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 18;

    ctx.fillStyle = "#00ffff";

    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height,
      this.width,
      this.height
    );

    ctx.restore();

  }

}

export class LaserManager {

  constructor() {
    this.lasers = [];
  }

  shoot(x, y) {
    this.lasers.push(new Laser(x, y));
  }

  update() {

    this.lasers = this.lasers.filter(laser => laser.active);

    for (const laser of this.lasers) {
      laser.update();
    }

  }

  draw(ctx) {

    for (const laser of this.lasers) {
      laser.draw(ctx);
    }

  }

}