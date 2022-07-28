import { Player } from "./player";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 30, "blue");
player.draw()

export{canvas, c}