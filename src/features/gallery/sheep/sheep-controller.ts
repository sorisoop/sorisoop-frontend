import type { Dot } from "./hill";
import { Sheep } from "./sheep";

export class SheepController {
  private img: HTMLImageElement;
  private items: Sheep[] = [];
  private cur = 0;
  private isLoaded = false;
  private stageWidth = 0;

  constructor() {
    this.img = new Image();
    this.img.onload = () => this.loaded();
    this.img.src = "/assets/gallery/sheep.png";
  }

  resize(stageWidth: number) {
    this.stageWidth = stageWidth;
  }

  private loaded() {
    this.isLoaded = true;
    this.addSheep();
  }

  private addSheep() {
    this.items.push(new Sheep(this.img, this.stageWidth));
  }

  draw(ctx: CanvasRenderingContext2D, t: number, dots: Dot[]) {
    if (!this.isLoaded) return;

    this.cur++;
    if (this.cur > 200) {
      this.cur = 0;
      this.addSheep();
    }

    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      if (item.posX < -item.width) {
        this.items.splice(i, 1);
      } else {
        item.draw(ctx, t, dots);
      }
    }
  }
}
