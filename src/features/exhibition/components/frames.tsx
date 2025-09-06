import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { ImageItem } from "@/features/exhibition/types";
import { Frame } from "@/features/exhibition/components";

const GOLDENRATIO = 1.61803398875;

export default function Frames({ images }: { images: ImageItem[] }) {
  const ref = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState<THREE.Object3D | null>(null);

  const q = new THREE.Quaternion();
  const p = new THREE.Vector3();

  useEffect(() => {
    if (clicked) {
      clicked.parent?.updateWorldMatrix(true, true);
      clicked.parent?.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.parent?.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  }, [clicked]);

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(clicked === e.object ? null : e.object);
      }}
    >
      {images.map((props) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  );
}
