export interface Dot {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

export class Hill {
  private color: string;
  private speed: number;
  private total: number;
  private stageWidth = 0;
  private stageHeight = 0;
  private points: { x: number; y: number }[] = [];
  private gap = 0;

  constructor(color: string, speed: number, total: number) {
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for (let i = 0; i < this.total; i++) {
      this.points[i] = { x: i * this.gap, y: this.getRandomY() };
    }
  }

  draw(ctx: CanvasRenderingContext2D): Dot[] {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    const dots: Dot[] = [];
    cur.x += this.speed;

    if (cur.x > -this.gap) {
      this.points.unshift({ x: -(this.gap * 2), y: this.getRandomY() });
    } else if (cur.x > this.stageWidth + this.gap) {
      this.points.splice(-1);
    }

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      cur.x += this.speed;

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({ x1: prevCx, y1: prevCy, x2: prev.x, y2: prev.y, x3: cx, y3: cy });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    return dots;
  }

  private getRandomY() {
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + Math.random() * max;
  }
}
