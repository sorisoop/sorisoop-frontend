import { distance } from "./utils";

export class Ripple {
  x = 0;
  y = 0;
  radius = 0;
  maxRadius = 0;
  speed = 10;
  stageWidth = 0;
  stageHeight = 0;

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  start(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = this.getMax(x, y);
  }

  animate() {
    if (this.radius < this.maxRadius) {
      this.radius += this.speed;
    }
  }

  private getMax(x: number, y: number) {
    const c1 = distance(0, 0, x, y);
    const c2 = distance(this.stageWidth, 0, x, y);
    const c3 = distance(0, this.stageHeight, x, y);
    const c4 = distance(this.stageWidth, this.stageHeight, x, y);
    return Math.max(c1, c2, c3, c4);
  }
}
