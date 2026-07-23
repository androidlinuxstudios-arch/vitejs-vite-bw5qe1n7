// boss.js

export class Boss {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = -120;

    this.radius = 70;
    this.health = 100;
    this.maxHealth = 100;

    this.speed = 1.5;
    this.active = false;
    this.dead = false;
  }

  spawn() {
    this.active = true;
    this.dead = false;
    this.health = this.maxHealth;
    this.y = -120;
    this.x = this.canvas.width / 2;
  }

  update() {
    if (!this.active || this.dead) return;

    if (this.y < 120)
      this.y += this.speed;
  }

  hit() {
    this.health--;

    if (this.health <= 0) {
      this.dead = true;
      this.active = false;
    }
  }

  draw(ctx) {
    if (!this.active || this.dead) return;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.shadowColor = "#ff0044";
    ctx.shadowBlur = 35;

    ctx.fillStyle = "#ff0044";

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-20, -10, 8, 0, Math.PI * 2);
    ctx.arc(20, -10, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Health Bar
    ctx.fillStyle = "#444";
    ctx.fillRect(40, 30, this.canvas.width - 80, 18);

    ctx.fillStyle = "#ff0044";
    ctx.fillRect(
      40,
      30,
      (this.health / this.maxHealth) * (this.canvas.width - 80),
      18
    );
  }
}