import { useRef, useEffect } from "react";
import { Dot, Ripple, collide } from "@/features/gallery/pixel";

export default function PixelRippleArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tmpCanvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const rippleRef = useRef(new Ripple());
  const dotsRef = useRef<Dot[]>([]);
  const imgRef = useRef<HTMLImageElement>(new Image());
  const imgDataRef = useRef<ImageData | null>(null);

  const pixelSize = 25;
  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const tmpCanvas = tmpCanvasRef.current;
    const tmpCtx = tmpCanvas.getContext("2d", { willReadFrequently: true })!;
    const ripple = rippleRef.current;

    let stageWidth = window.innerWidth;
    let stageHeight = window.innerHeight;

    const resize = () => {
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;

      canvas.width = stageWidth;
      canvas.height = stageHeight;

      tmpCanvas.width = stageWidth;
      tmpCanvas.height = stageHeight;

      ripple.resize(stageWidth, stageHeight);
      if (imgRef.current.complete) drawImage();
    };

    const drawImage = () => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);

      const img = imgRef.current;
      const stageRatio = stageWidth / stageHeight;
      const imgRatio = img.width / img.height;

      let imgX = 0,
        imgY = 0,
        imgW = stageWidth,
        imgH = stageHeight;

      if (imgRatio > stageRatio) {
        imgW = Math.round(img.width * (stageHeight / img.height));
        imgX = Math.round((stageWidth - imgW) / 2);
      } else {
        imgH = Math.round(img.height * (stageWidth / img.width));
        imgY = Math.round((stageHeight - imgH) / 2);
      }

      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      tmpCtx.drawImage(img, imgX, imgY, imgW, imgH);

      imgDataRef.current = tmpCtx.getImageData(0, 0, stageWidth, stageHeight);

      drawDots(stageWidth, stageHeight);
    };

    const drawDots = (w: number, h: number) => {
      dotsRef.current = [];
      const rows = Math.ceil(h / pixelSize);
      const cols = Math.ceil(w / pixelSize);

      for (let i = 0; i < rows; i++) {
        const y = (i + 0.5) * pixelSize;
        for (let j = 0; j < cols; j++) {
          const x = (j + 0.5) * pixelSize;
          const idx = (Math.floor(x) + Math.floor(y) * w) * 4;

          const data = imgDataRef.current!.data;
          const r = data[idx],
            g = data[idx + 1],
            b = data[idx + 2];

          dotsRef.current.push(new Dot(x, y, radius, pixelSize, r, g, b));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      ctx.drawImage(imgRef.current, 0, 0, imgRef.current.width, imgRef.current.height, 0, 0, stageWidth, stageHeight);

      ripple.animate();

      for (const dot of dotsRef.current) {
        if (collide(dot.x, dot.y, ripple.x, ripple.y, ripple.radius)) {
          dot.animate(ctx);
        }
      }
      requestAnimationFrame(animate);
    };

    const onClick = (e: MouseEvent) => {
      dotsRef.current.forEach((d) => d.reset());
      ctx.drawImage(imgRef.current, 0, 0, imgRef.current.width, imgRef.current.height, 0, 0, stageWidth, stageHeight);
      ripple.start(e.offsetX, e.offsetY);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("click", onClick);

    imgRef.current.src = "/assets/gallery/ant.webp";
    imgRef.current.onload = () => {
      resize();
      drawImage();
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
