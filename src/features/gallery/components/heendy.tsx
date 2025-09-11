import * as THREE from "three";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";

export interface HeendyRef {
  moveTo: (target: THREE.Vector3) => void;
}
interface HeendyProps {
  modelSrc: string;
}

const Heendy = forwardRef<HeendyRef, HeendyProps>(({ modelSrc }, ref) => {
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, modelSrc, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const walkActionRef = useRef<THREE.AnimationAction | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const [destination, setDestination] = useState<THREE.Vector3 | null>(null);

  useImperativeHandle(ref, () => ({
    moveTo: (target: THREE.Vector3) => {
      target.y = 0.7;
      setDestination(target);
    },
  }));

  useEffect(() => {
    if (!gltf) return;
    const model = gltf.scene;
    model.position.y = 0.8;

    model.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });

    if (groupRef.current) groupRef.current.add(model);

    mixerRef.current = new THREE.AnimationMixer(model);
    if (gltf.animations.length > 0) {
      const walk =
        gltf.animations.find(
          (clip) => clip.name.toLowerCase().includes("run") || clip.name.toLowerCase().includes("walk")
        ) || gltf.animations[0];
      if (walk) walkActionRef.current = mixerRef.current.clipAction(walk);
    }
  }, [gltf]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    mixerRef.current?.update(delta);

    if (destination) {
      const pos = groupRef.current.position;
      const dir = destination.clone().sub(pos);
      const dist = dir.length();

      if (dist > 0.1) {
        dir.normalize();
        pos.add(dir.multiplyScalar(0.07));
        groupRef.current.lookAt(destination);

        if (walkActionRef.current && currentActionRef.current !== walkActionRef.current) {
          currentActionRef.current?.stop();
          walkActionRef.current.reset().play();
          currentActionRef.current = walkActionRef.current;
        }
      } else {
        setDestination(null);
        walkActionRef.current?.stop();
        currentActionRef.current = null;
      }
    }

    const targetPos = groupRef.current.position.clone();
    const cameraOffset = new THREE.Vector3(-4, 6, 8);
    const desiredPos = targetPos.clone().add(cameraOffset);
    camera.position.lerp(desiredPos, 0.1);
    camera.lookAt(groupRef.current.position);
  });

  return <group ref={groupRef} position={[0, 0.7, 0]} />;
});

Heendy.displayName = "Heendy";
export default Heendy;
