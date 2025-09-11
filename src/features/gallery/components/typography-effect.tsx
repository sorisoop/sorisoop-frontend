import { useEffect, useRef } from "react";
import { Visual } from "@/features/gallery/typography";

const getViewportSize = () => {
  const width = window.innerWidth;
  const height = window.visualViewport?.height ?? window.innerHeight;
  return { width, height };
};

export default function TypographyEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualRef = useRef<Visual | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    const visual = new Visual();
    visualRef.current = visual;

    let stageWidth = 0;
    let stageHeight = 0;

    const resize = () => {
      const { width, height } = getViewportSize();

      stageWidth = width;
      stageHeight = height;

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // scale 중복 방지
      ctx.scale(pixelRatio, pixelRatio);

      visual.show(stageWidth, stageHeight);
    };

    const animate = (t: number) => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      visual.animate(ctx, t);
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
