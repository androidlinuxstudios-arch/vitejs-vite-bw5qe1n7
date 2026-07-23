// enemy.js
// Neon Assault 2.0

export class Enemy {

  constructor(canvas) {

    this.canvas = canvas;

    this.reset();

  }

  reset() {

    const types = ["scout","interceptor","heavy"];

    this.type = types[
      Math.floor(Math.random()*types.length)
    ];

    this.dead = false;

    this.wave = Math.random()*Math.PI*2;

    this.x = Math.random()*(this.canvas.width-100)+50;

    this.y = -80;

    switch(this.type){

      case "scout":

        this.radius=16;
        this.speed=5;

        this.color="#ff3366";

      break;

      case "interceptor":

        this.radius=20;
        this.speed=3.2;

        this.color="#aa66ff";

      break;

      case "heavy":

        this.radius=30;
        this.speed=2;

        this.color="#ffaa00";

      break;

    }

  }

  update(){

    this.y+=this.speed;

    if(this.type==="interceptor"){

      this.wave+=0.08;

      this.x+=Math.sin(this.wave)*4;

    }

  }

  draw(ctx){

    if(this.dead) return;

    ctx.save();

    ctx.translate(this.x,this.y);

    ctx.shadowColor=this.color;
    ctx.shadowBlur=25;

    //----------------------
    // SCOUT
    //----------------------

    if(this.type==="scout"){

      ctx.fillStyle=this.color;

      ctx.beginPath();

      ctx.moveTo(0,-22);

      ctx.lineTo(-18,14);

      ctx.lineTo(-6,8);

      ctx.lineTo(0,18);

      ctx.lineTo(6,8);

      ctx.lineTo(18,14);

      ctx.closePath();

      ctx.fill();

      ctx.fillStyle="#ffffff";

      ctx.beginPath();

      ctx.arc(0,-2,4,0,Math.PI*2);

      ctx.fill();

    }

    //----------------------
    // INTERCEPTOR
    //----------------------

    if(this.type==="interceptor"){

      ctx.fillStyle=this.color;

      ctx.beginPath();

      ctx.moveTo(0,-24);

      ctx.lineTo(-22,0);

      ctx.lineTo(0,24);

      ctx.lineTo(22,0);

      ctx.closePath();

      ctx.fill();

      ctx.fillStyle="#00ffff";

      ctx.beginPath();

      ctx.arc(-8,0,3,0,Math.PI*2);

      ctx.arc(8,0,3,0,Math.PI*2);

      ctx.fill();

    }

    //----------------------
    // HEAVY CRUISER
    //----------------------

    if(this.type==="heavy"){

      ctx.fillStyle=this.color;

      ctx.beginPath();

      ctx.arc(0,0,28,0,Math.PI*2);

      ctx.fill();

      ctx.fillStyle="#552200";

      ctx.beginPath();

      ctx.arc(0,0,18,0,Math.PI*2);

      ctx.fill();

      ctx.fillStyle="#ffffff";

      ctx.beginPath();

      ctx.arc(-8,-6,4,0,Math.PI*2);

      ctx.arc(8,-6,4,0,Math.PI*2);

      ctx.fill();

    }

    //----------------------
    // ENGINE GLOW
    //----------------------

    const glow=
      4+
      Math.sin(Date.now()/120)*2;

    ctx.fillStyle="#00ffff";

    ctx.shadowColor="#00ffff";

    ctx.beginPath();

    ctx.arc(
      0,
      this.radius-4,
      glow,
      0,
      Math.PI*2
    );

    ctx.fill();

    ctx.restore();

  }

}