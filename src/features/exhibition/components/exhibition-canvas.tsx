import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial, Environment } from "@react-three/drei";
import type { ImageItem } from "@/features/exhibition/types";
import { Frames } from "@/features/exhibition/components";
import HeendyController from "./hindy-controller";

export default function ExhibitionCanvas({ images }: { images: ImageItem[] }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 10] }}>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 15]} />
      <HeendyController />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </Canvas>
  );
}
