import { Player } from "./player";
import { Projectile } from "./projectiles";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

(function () {
  const player = new Player(x, y, 30, "blue");
  player.draw();

  addEventListener("click", (event) => {
    const projectile = new Projectile(
      event.clientX,
      event.clientY,
      5,
      "red",
      null
    );
    projectile.draw();
  });
})();

export { canvas, c };
