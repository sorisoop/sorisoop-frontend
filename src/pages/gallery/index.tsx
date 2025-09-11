import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGalleryStore } from "@/store/gallery";
import { Box } from "@react-three/drei";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { GalleryFallback, Img, Scene, GalleryDialog } from "@/features/gallery/components";
import { GalleryDialogProvider } from "@/features/gallery/providers";
import { useGalleryDialog } from "@/features/gallery/hooks";

function GalleryCanvas() {
  const store = useGalleryStore();
  const { setSelectedImage } = useGalleryDialog();

  return (
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
            onClick={() => setSelectedImage(frame.img)}
          >
            <Img src={frame.img} />
          </Box>
        ))}
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default function GalleryPage() {
  return (
    <FullScreenBackHeaderLayout>
      <div className="w-full h-dvh relative">
        <GalleryDialogProvider>
          <GalleryCanvas />
          <GalleryDialog />
        </GalleryDialogProvider>
      </div>
    </FullScreenBackHeaderLayout>
  );
}
