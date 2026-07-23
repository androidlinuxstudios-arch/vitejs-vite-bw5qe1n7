let shake = 0;
import { Boss } from "./boss.js";
import { PowerUp } from "./powerups.js";
import { sound } from "./sound.js";
import "./style.css";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { LaserManager } from "./laser.js";
import { Starfield } from "./stars.js";
import { Explosion } from "./explosion.js";

document.querySelector("#app").innerHTML = `
<div id="hud">
  <div id="score">SCORE: 0</div>
  <div id="lives">❤️❤️❤️</div>
</div>

<canvas id="game"></canvas>

<div id<h1 id="logo">
<span>NEON</span>
<span>ASSAULT</span>
</h1>="menu">

  <button id="play">PLAY</button>
  <div id="creator">🌈 Edgar562 🌈</div>
</div>

<div id="gameover" style="display:none">
  <h1>GAME OVER</h1>
  <div id="final-score"></div>
  <button id="restart">PLAY AGAIN</button>
</div>
`;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const stars = new Starfield(canvas);let menuShip = 0;
const background = new Background(canvas);
const player = new Player(canvas);
const lasers = new LaserManager();
const boss = new Boss(canvas);
const enemies = [];
const explosions = [];
const powerups = [];
const MAX_ENEMIES = 5;

let score = 0;
let lives = 3;
let playing = false;
let spawnTimer = 0;

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const menuEl = document.getElementById("menu");
const gameoverEl = document.getElementById("gameover");
const finalScoreEl = document.getElementById("final-score");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  player.resize();
}

window.addEventListener("resize", resize);
resize();

function updateHud() {
  scoreEl.textContent = `SCORE: ${score}`;
  livesEl.textContent = "❤️".repeat(Math.max(0, lives));
}

function startGame() {
  sound.init();
  score = 0;
  lives = 3;
  enemies.length = 0;
  explosions.length = 0;
  lasers.lasers.length = 0;
  spawnTimer = 0;

  player.x = canvas.width / 2;

  playing = true;
  menuEl.style.display = "none";
  gameoverEl.style.display = "none";

  updateHud();
}

document.getElementById("play").onclick = startGame;
document.getElementById("restart").onclick = startGame;

canvas.addEventListener("mousemove", e => {
  if (playing) player.moveTo(e.clientX);
});

canvas.addEventListener("touchmove", e => {
  if (!playing) return;

  e.preventDefault();
  player.moveTo(e.touches[0].clientX);

}, { passive:false });

setInterval(() => {
  if (playing) {
    lasers.shoot(player.x, player.y - 20);
    sound.laser();
  }
}, 250);

function distance(a,b,c,d){

  return Math.hypot(a-c,b-d);

}

function spawnEnemy(){

  if(enemies.length<MAX_ENEMIES){

    enemies.push(new Enemy(canvas));

  }

}

function endGame(){

  playing=false;

  finalScoreEl.textContent=`Final Score: ${score}`;

  gameoverEl.style.display="flex";

}

function loop(){

  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.update();
  background.draw(ctx);
  stars.update();
  stars.draw(ctx);
// Menu background ship

if (!playing) {

  menuShip += 1.5;

  if (menuShip > canvas.width + 150)
      menuShip = -150;

  ctx.save();

  ctx.translate(
      menuShip,
      canvas.height * 0.65 +
      Math.sin(menuShip * 0.01) * 20
  );

  ctx.rotate(Math.sin(menuShip * 0.004) * 0.08);

  ctx.shadowColor = "#00ffff";
  ctx.shadowBlur = 30;

  // Body

  ctx.fillStyle="#00ccff";

  ctx.beginPath();

  ctx.moveTo(0,-40);
  ctx.lineTo(-24,28);
  ctx.lineTo(0,12);
  ctx.lineTo(24,28);

  ctx.closePath();

  ctx.fill();

  // Wings

  ctx.fillStyle="#66ffff";

  ctx.beginPath();
  ctx.moveTo(-38,20);
  ctx.lineTo(-12,0);
  ctx.lineTo(-8,16);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(38,20);
  ctx.lineTo(12,0);
  ctx.lineTo(8,16);
  ctx.closePath();
  ctx.fill();

  // Cockpit

  ctx.fillStyle="white";

  ctx.beginPath();
  ctx.arc(0,-10,6,0,Math.PI*2);
  ctx.fill();

  // Engine

  ctx.fillStyle="#00ffff";

  ctx.beginPath();
  ctx.moveTo(-5,28);
  ctx.lineTo(0,45+Math.sin(menuShip*.2)*6);
  ctx.lineTo(5,28);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

}
  if(playing){

    spawnTimer++;

    if(spawnTimer>90){

      spawnEnemy();

      spawnTimer=0;

    }

    lasers.update();
    for (const powerup of powerups) {

      if (powerup.dead) continue;
    
      const dx = powerup.x - player.x;
      const dy = powerup.y - player.y;
    
      if (Math.hypot(dx,dy) < player.radius + powerup.radius) {
    
        powerup.dead = true;
    
        switch(powerup.type){
    
          case "life":
            lives++;
            updateHud();
            break;
    
          case "rapid":
            score += 50;
            break;
    
          case "double":
            score += 75;
            break;
    
          case "shield":
            score += 100;
            break;
    
        }
    
      }
    
    }
    for(const enemy of enemies)
      enemy.update();
     for (const powerup of powerups)
       powerup.update();
    // collisions
    if (boss.active) {
      for (const laser of lasers.lasers) {
        if (!laser.active) continue;
    
        const dx = laser.x - boss.x;
        const dy = laser.y - boss.y;
    
        if (Math.hypot(dx, dy) < boss.radius) {
          laser.active = false;
          boss.hit();
    
          if (boss.dead) {
            score += 500;
            updateHud();
          }
        }
      }
    }
    for(const laser of lasers.lasers){

      if(!laser.active) continue;

      for(const enemy of enemies){

        if(enemy.dead) continue;

        if(distance(laser.x,laser.y,enemy.x,enemy.y)<enemy.radius){

          laser.active=false;
          enemy.dead=true;

          explosions.push(
            new Explosion(enemy.x, enemy.y)
          );

          if (Math.random() < 0.25) {
            powerups.push(new PowerUp(canvas, enemy.x, enemy.y));
          }

          sound.explosion();

          score += 10;
          if (score > 0 && score % 500 === 0 && !boss.active) {
            boss.spawn();
          }
          updateHud();

        }

      }

    }

    for(const enemy of enemies){

      if(enemy.dead) continue;

      if(distance(enemy.x,enemy.y,player.x,player.y)
      <enemy.radius+player.radius){

        enemy.dead=true;

        explosions.push(
          new Explosion(enemy.x,enemy.y)
        );
        shake = 8;
        lives--;
        sound.hit();
        updateHud();

        if(lives<=0)
          endGame();

      }

    }

    for(let i=enemies.length-1;i>=0;i--){

      if(enemies[i].dead)
        enemies.splice(i,1);

    }

    for(let i=explosions.length-1;i>=0;i--){

      explosions[i].update();

      if(explosions[i].dead)
        explosions.splice(i,1);

    }
    if (shake > 0) {

      ctx.save();
    
      ctx.translate(
        (Math.random() - .5) * shake,
        (Math.random() - .5) * shake
      );
    
      shake *= .85;
    
    }
    player.draw(ctx);
    boss.update();
boss.draw(ctx);
    lasers.draw(ctx);
    for(let i=powerups.length-1;i>=0;i--){

      if(powerups[i].dead)
        powerups.splice(i,1);
    
    }
    for(const enemy of enemies)
      enemy.draw(ctx);

    for(const explosion of explosions)
      explosion.draw(ctx);
     for (const powerup of powerups)
       powerup.draw(ctx);
  }
  if (shake > 0.1) {
    ctx.restore();
  }
  requestAnimationFrame(loop);

}

loop();
