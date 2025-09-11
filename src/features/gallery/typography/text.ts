interface Pos {
  x: number;
  y: number;
}

export class Text {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2D context not supported");
    this.ctx = context;
  }

  setText(str: string, density: number, stageWidth: number, stageHeight: number): Pos[] {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const fontSize = Math.min(stageWidth, stageHeight) * 0.8;

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `700 ${fontSize}px sans-serif`;
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(str, stageWidth / 2, stageHeight / 2);

    return this.dotPos(density, stageWidth, stageHeight);
  }

  private dotPos(density: number, stageWidth: number, stageHeight: number): Pos[] {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles: Pos[] = [];
    let i = 0;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      let width = i % 2 === 0 ? 6 : 0;

      for (; width < stageWidth; width += density) {
        const pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (pixel !== 0) {
          particles.push({ x: width, y: height });
        }
      }
    }

    return particles;
  }
}
