import { useEffect, useRef } from "react";
import { Hill, SheepController, Sun, type Dot } from "@/features/gallery/sheep";

export default function SheepEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    const sun = new Sun();
    const hills = [new Hill("#fd6bea", 0.2, 12), new Hill("#ff59c2", 0.5, 8), new Hill("#ff4674", 1.4, 6)];
    const sheepController = new SheepController();

    let stageWidth = 0;
    let stageHeight = 0;

    const resize = () => {
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);

      sun.resize(stageWidth);
      hills.forEach((h) => h.resize(stageWidth, stageHeight));
      sheepController.resize(stageWidth);
    };

    const animate = (t: number) => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, stageWidth, stageHeight);

      sun.draw(ctx, t);

      let dots: Dot[] = [];
      hills.forEach((h) => {
        dots = h.draw(ctx);
      });

      sheepController.draw(ctx, t, dots);
    };

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
