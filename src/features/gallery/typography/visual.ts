import { Particle } from "./particle";
import { Text } from "./text";

export const RANDOM_TEXT = "ABCMNRSTUXZ";

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

export class Visual {
  private text: Text;
  private textArr: string[];
  private particles: Particle[];
  private mouse: Mouse;
  private pos: { x: number; y: number }[] = [];

  constructor() {
    this.text = new Text();
    this.textArr = RANDOM_TEXT.split("");
    this.particles = [];
    this.mouse = { x: 0, y: 0, radius: 100 };

    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  show(stageWidth: number, stageHeight: number) {
    const str = this.textArr[Math.floor(Math.random() * this.textArr.length)];
    this.pos = this.text.setText(str, 26, stageWidth, stageHeight);

    this.particles = this.pos.map((p) => new Particle(p));
  }

  animate(ctx: CanvasRenderingContext2D, t: number) {
    for (const item of this.particles) {
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sin(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
        item.collide();
      }

      item.draw(ctx, t);
    }
  }

  private onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
