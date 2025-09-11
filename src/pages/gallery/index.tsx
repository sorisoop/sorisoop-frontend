import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGalleryStore } from "@/store/gallery";
import { Box } from "@react-three/drei";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { GalleryFallback, Img, Scene } from "@/features/gallery/components";
import { Suspense } from "react";

export default function GalleryPage() {
  const store = useGalleryStore();

  return (
    <FullScreenBackHeaderLayout>
      <div className="w-full h-dvh relative">
        <Canvas
          shadows
          camera={{ fov: 60, position: [0, 8, 10] }}
          className="w-full h-full"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
          onCreated={({ gl }) => {
            return () => {
              gl.dispose();
            };
          }}
        >
          <Suspense fallback={<GalleryFallback />}>
            {store.frames?.map((frame, index) => (
              <Box
                key={index}
                position={frame.position}
                rotation={frame.rotation as [number, number, number, THREE.EulerOrder]}
                scale={frame.scale}
                args={[4, 2, 0.2]}
              >
                <Img src={frame.img} />
              </Box>
            ))}
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </FullScreenBackHeaderLayout>
  );
}
