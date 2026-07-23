// player.js
// Neon Assault 2.0

export class Player {
  constructor(canvas) {
    this.canvas = canvas;

    this.x = canvas.width / 2;
    this.y = canvas.height - 100;

    this.radius = 22;

    this.bank = 0;
    this.engine = 0;
  }

  resize() {
    this.y = this.canvas.height - 100;
  }

  moveTo(x) {

    const dx = x - this.x;

    this.bank = Math.max(-18, Math.min(18, dx * 0.15));

    this.x += dx * 0.25;

    this.x = Math.max(
      this.radius,
      Math.min(this.canvas.width - this.radius, this.x)
    );
  }

  draw(ctx) {

    this.engine += 0.25;

    const flame = 16 + Math.sin(this.engine) * 6;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.rotate(this.bank * Math.PI / 180);

    // ========= ENGINE GLOW =========

    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 30;

    const grad = ctx.createLinearGradient(0, 20, 0, 40);

    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(.4, "#00ffff");
    grad.addColorStop(1, "#0044ff");

    ctx.fillStyle = grad;

    ctx.beginPath();

    ctx.moveTo(-6, 22);
    ctx.lineTo(0, flame + 30);
    ctx.lineTo(6, 22);

    ctx.closePath();

    ctx.fill();

    // ========= LEFT WING =========

    ctx.fillStyle = "#00aaff";

    ctx.beginPath();

    ctx.moveTo(-24, 16);
    ctx.lineTo(-10, -2);
    ctx.lineTo(-4, 12);

    ctx.closePath();

    ctx.fill();

    // ========= RIGHT WING =========

    ctx.beginPath();

    ctx.moveTo(24, 16);
    ctx.lineTo(10, -2);
    ctx.lineTo(4, 12);

    ctx.closePath();

    ctx.fill();

    // ========= MAIN BODY =========

    const body = ctx.createLinearGradient(0, -25, 0, 25);

    body.addColorStop(0, "#dfffff");
    body.addColorStop(.35, "#66ffff");
    body.addColorStop(1, "#0099ff");

    ctx.fillStyle = body;

    ctx.beginPath();

    ctx.moveTo(0, -34);
    ctx.lineTo(-12, 18);
    ctx.lineTo(0, 10);
    ctx.lineTo(12, 18);

    ctx.closePath();

    ctx.fill();

    // ========= COCKPIT =========

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.ellipse(
      0,
      -8,
      5,
      10,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // ========= WING LIGHTS =========

    const pulse = 0.5 + Math.sin(this.engine * 2) * 0.5;

    ctx.globalAlpha = pulse;

    ctx.fillStyle = "#00ffff";

    ctx.beginPath();
    ctx.arc(-17, 8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(17, 8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // ========= NOSE LIGHT =========

    ctx.beginPath();
    ctx.arc(0, -28, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}