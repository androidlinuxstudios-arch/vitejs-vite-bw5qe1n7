// powerup.js

export class PowerUp {
  constructor(canvas, x, y) {
    this.canvas = canvas;

    this.x = x;
    this.y = y;

    const types = [
      "rapid",
      "double",
      "life",
      "shield"
    ];

    this.type = types[Math.floor(Math.random() * types.length)];

    this.radius = 14;
    this.speed = 2;
    this.dead = false;
  }

  update() {
    this.y += this.speed;

    if (this.y > this.canvas.height + 40)
      this.dead = true;
  }

  draw(ctx) {

    if (this.dead) return;

    ctx.save();

    ctx.translate(this.x, this.y);

    let color = "#00ffff";
    let symbol = "⚡";

    switch (this.type) {

      case "rapid":
        color = "#00ffff";
        symbol = "⚡";
        break;

      case "double":
        color = "#ffff00";
        symbol = "✦";
        break;

      case "life":
        color = "#ff3366";
        symbol = "❤";
        break;

      case "shield":
        color = "#66ff66";
        symbol = "🛡";
        break;

    }

    ctx.shadowColor = color;
    ctx.shadowBlur = 20;

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0,0,this.radius,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#000";
    ctx.font="16px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(symbol,0,1);

    ctx.restore();

  }

}