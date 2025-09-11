export class Sun {
  private radius = 200;
  private total = 60;
  private gap = 1 / this.total;
  private originPos: { x: number; y: number }[] = [];
  private pos: { x: number; y: number }[] = [];
  private fps = 30;
  private fpsTime = 1000 / this.fps;
  private time?: number;
  private x = 0;
  private y = 0;

  constructor() {
    for (let i = 0; i < this.total; i++) {
      const p = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = p;
      this.pos[i] = p;
    }
  }

  resize(stageWidth: number) {
    this.x = stageWidth - this.radius - 140;
    this.y = this.radius + 100;
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    if (!this.time) this.time = t;
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    ctx.fillStyle = "#ffb200";
    ctx.beginPath();
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }
    ctx.fill();
  }

  private updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];
      this.pos[i] = { x: pos.x + this.ranInt(5), y: pos.y + this.ranInt(5) };
    }
  }

  private ranInt(max: number) {
    return Math.random() * max;
  }

  private getCirclePoint(radius: number, t: number) {
    const theta = Math.PI * 2 * t;
    return { x: Math.cos(theta) * radius, y: Math.sin(theta) * radius };
  }
}
