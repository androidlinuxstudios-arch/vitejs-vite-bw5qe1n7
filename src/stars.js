// stars.js
// Neon Assault 2.0

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;

    this.layers = [
      this.createLayer(140, 0.4, 1.5),
      this.createLayer(80, 1.0, 2.5),
      this.createLayer(40, 2.0, 4.0)
    ];

    this.shootingStars = [];
    this.timer = 0;
  }

  createLayer(count, minSpeed, maxSpeed) {
    const stars = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
        alpha: Math.random(),
        twinkle: Math.random() * Math.PI * 2
      });
    }

    return stars;
  }

  update() {

    this.timer++;

    for (const layer of this.layers) {

      for (const star of layer) {

        star.y += star.speed;

        star.twinkle += 0.05;

        star.alpha = 0.4 + Math.sin(star.twinkle) * 0.6;

        if (star.y > this.canvas.height) {
          star.y = 0;
          star.x = Math.random() * this.canvas.width;
        }

      }

    }

    if (this.timer > 180) {

      this.timer = 0;

      this.shootingStars.push({
        x: Math.random() * this.canvas.width,
        y: -40,
        dx: -8,
        dy: 8,
        life: 70
      });

    }

    for (const star of this.shootingStars) {
      star.x += star.dx;
      star.y += star.dy;
      star.life--;
    }

    this.shootingStars =
      this.shootingStars.filter(s => s.life > 0);
  }

  draw(ctx) {

    // Nebula glow
    const g = ctx.createRadialGradient(
      this.canvas.width * 0.5,
      this.canvas.height * 0.3,
      50,
      this.canvas.width * 0.5,
      this.canvas.height * 0.3,
      500
    );

    g.addColorStop(0, "rgba(0,180,255,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = g;
    ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Stars
    for (const layer of this.layers) {

      for (const star of layer) {

        ctx.save();

        ctx.globalAlpha = star.alpha;

        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 8;

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();

      }

    }

    // Shooting stars
    for (const s of this.shootingStars) {

      ctx.save();

      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 15;

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + 40, s.y - 40);
      ctx.stroke();

      ctx.restore();

    }

  }
}