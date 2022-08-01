import { Player } from "./player";
import { Projectile } from "./projectiles";
import { Particle } from "./particle";
import { spawnEnemies } from "./spawn-enemies";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector("#scoreEl");

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 10, "white");
const projectiles = [];
const enemies = [];
const particles = [];

let animationId;
let score = 0;

function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();

  particles.forEach((particle, index) =>{
    if(particle.alpha <= 0){
      particles.splice(index, 1)
    }else{
      particle.update()
    }
  })

  projectiles.forEach((projectile, index) => {
    projectile.update();

    //remove  from edges of screem
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y - projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, index) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    //end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // when projectiles touch enemy
      if (dist - enemy.radius - projectile.radius < 1) {

        //create explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
              x: (Math.random() - 0.5)*(Math.random()*6),
              y: (Math.random() - 0.5)*(Math.random()*6)
            })
          );
        }

        if (enemy.radius - 10 > 5) {

        //increase our score
        score += 100
        scoreEl.innerHTML = score

          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          //remove from scene altogether
        score += 250
        scoreEl.innerHTML = score
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle) * 4,
    y: Math.sin(angle) * 4,
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", velocity)
  );
});

animate();
spawnEnemies();

export { canvas, c, enemies };
