import { Player } from "./player";
import { Projectile } from "./projectiles";
import { Enemy } from "./enemy";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");

const projectiles = [];
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;
    let x
    let y

    if (Math.random() < 0.5 ) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height
    }else{
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    
    const color = "green";
    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x
    );
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
    console.log(enemies);
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy, index) => {
    enemy.update();

    projectiles.forEach((projectile, projectileIndex) =>{
      const dist = Math.hypot(projectile.x -enemy.x, projectile.y - enemy.y)
      
      if(dist - enemy.radius -projectile.radius < 1){
        setTimeout(() => {
          enemies.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
        }, 0);
       
      }
    })
  });
}

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
spawnEnemies();

export { canvas, c };
