// background.js
// Neon Assault 2.0

export class Background {

  constructor(canvas){

    this.canvas = canvas;

    this.angle = 0;

    this.asteroids = [];

    for(let i=0;i<8;i++){

      this.asteroids.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,

        r:20+Math.random()*30,

        speed:.5+Math.random()*1.2,

        rot:Math.random()*360

      });

    }

  }

  update(){

    this.angle+=0.002;

    for(const a of this.asteroids){

      a.y+=a.speed;

      a.rot+=0.4;

      if(a.y>this.canvas.height+60){

        a.y=-60;

        a.x=Math.random()*this.canvas.width;

      }

    }

  }

  draw(ctx){

    // Nebula

    const nebula=ctx.createRadialGradient(

      this.canvas.width*.25,
      this.canvas.height*.3,
      0,

      this.canvas.width*.25,
      this.canvas.height*.3,
      350

    );

    nebula.addColorStop(0,"rgba(0,255,255,.10)");
    nebula.addColorStop(.5,"rgba(0,120,255,.05)");
    nebula.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle=nebula;

    ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Planet

    ctx.save();

    ctx.translate(
      this.canvas.width-170,
      140
    );

    ctx.rotate(this.angle);

    const planet=ctx.createRadialGradient(
      0,-20,20,
      0,0,90
    );

    planet.addColorStop(0,"#66ffff");
    planet.addColorStop(.4,"#0077ff");
    planet.addColorStop(1,"#001133");

    ctx.fillStyle=planet;

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      80,
      0,
      Math.PI*2
    );

    ctx.fill();

    ctx.strokeStyle="rgba(255,255,255,.15)";
    ctx.lineWidth=3;

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      88,
      0,
      Math.PI*2
    );

    ctx.stroke();

    ctx.restore();

    // Asteroids

    ctx.fillStyle="#555";

    for(const a of this.asteroids){

      ctx.save();

      ctx.translate(a.x,a.y);

      ctx.rotate(a.rot*Math.PI/180);

      ctx.beginPath();

      for(let i=0;i<8;i++){

        const ang=i*Math.PI/4;

        const rr=a.r+(Math.sin(i)*5);

        const x=Math.cos(ang)*rr;

        const y=Math.sin(ang)*rr;

        if(i===0)
          ctx.moveTo(x,y);
        else
          ctx.lineTo(x,y);

      }

      ctx.closePath();

      ctx.fill();

      ctx.restore();

    }

  }

}