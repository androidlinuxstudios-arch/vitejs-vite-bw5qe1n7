// explosion.js
// Neon Assault 2.0

export class Explosion {

  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.life = 45;

    this.ring = 0;

    this.particles = [];

    for (let i = 0; i < 45; i++) {

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;

      this.particles.push({

        x,
        y,

        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,

        size: 2 + Math.random() * 5,

        life: 30 + Math.random() * 20,

        color: Math.random() > .5
          ? "#ffaa00"
          : "#ff3366"

      });

    }

  }

  update() {

    this.life--;

    this.ring += 4;

    for (const p of this.particles) {

      p.x += p.dx;
      p.y += p.dy;

      p.dx *= .98;
      p.dy *= .98;

      p.life--;

    }

    this.particles =
      this.particles.filter(p => p.life > 0);

  }

  draw(ctx) {

    // Shockwave

    ctx.save();

    ctx.strokeStyle = "rgba(0,255,255,.5)";
    ctx.lineWidth = 4;

    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 25;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.ring,
      0,
      Math.PI * 2
    );

    ctx.stroke();

    ctx.restore();

    // Bright Flash

    if (this.life > 35) {

      ctx.save();

      ctx.globalAlpha = .45;

      ctx.fillStyle = "#ffffff";

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        28,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();

    }

    // Sparks

    for (const p of this.particles) {

      ctx.save();

      ctx.globalAlpha = p.life / 50;

      ctx.shadowColor = p.color;
      ctx.shadowBlur = 18;

      ctx.fillStyle = p.color;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();

    }

  }

  get dead() {

    return this.life <= 0 &&
           this.particles.length === 0;

  }

}