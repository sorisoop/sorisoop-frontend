import { Visual } from "./visual";

class App {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pixelRatio: number;
  private visual!: Visual;
  private stageWidth!: number;
  private stageHeight!: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2D context not supported");
    this.ctx = context;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.visual = new Visual();
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  private resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // scale 중복 방지
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.visual.show(this.stageWidth, this.stageHeight);
  }

  private animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.visual.animate(this.ctx, t);
  }
}

window.onload = () => {
  new App();
};
