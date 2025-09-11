import { RANDOM_TEXT } from "./visual";

const FRICTION = 0.86;
const COLOR_SPEED = 0.12;

interface Pos {
  x: number;
  y: number;
}

export class Particle {
  savedX: number;
  savedY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  textArr: string[];
  cur: number;
  total: number;
  fps: number;
  fpsTime: number;
  savedRgb: number;
  rgb: number;
  private time?: number;

  constructor(pos: Pos) {
    this.savedX = pos.x;
    this.savedY = pos.y;
    this.x = pos.x;
    this.y = pos.y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 10;

    this.textArr = RANDOM_TEXT.split("");
    this.cur = 0;
    this.total = this.textArr.length;

    this.fps = 15;
    this.fpsTime = 1000 / this.fps;

    this.savedRgb = 0xffffff;
    this.rgb = 0xffffff;
  }

  collide() {
    this.rgb = 0xf3316e;
    this.textArr = this.shuffle(this.textArr);
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

    if (!this.time) this.time = t;
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.cur++;
      if (this.cur >= this.total) this.cur = 0;
    }

    this.vx *= FRICTION;
    this.vy *= FRICTION;
    this.x += this.vx;
    this.y += this.vy;

    const red = (this.rgb >> 16) & 0xff;
    const green = (this.rgb >> 8) & 0xff;
    const blue = this.rgb & 0xff;
    const color = `rgb(${red}, ${green}, ${blue})`;

    const str = this.textArr[this.cur];

    ctx.beginPath();
    ctx.fillStyle = color;

    const fontSize = 16;
    ctx.font = `700 ${fontSize}px sans-serif`;
    ctx.textBaseline = "middle";

    const textPos = ctx.measureText(str);
    ctx.fillText(str, this.x - textPos.width / 2, this.y + (fontSize - (textPos.actualBoundingBoxAscent ?? 0)) / 2);
  }

  private shuffle(arr: string[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
