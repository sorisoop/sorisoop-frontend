import * as THREE from "three";
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useGalleryDialog } from "@/features/gallery/hooks";

export interface HeendyRef {
  startMove: (target: THREE.Vector3) => void;
  stopMove: () => void;
}

interface HeendyProps {
  modelSrc: string;
}

const Heendy = forwardRef<HeendyRef, HeendyProps>(({ modelSrc }, ref) => {
  const { camera } = useThree();
  const { isPaused } = useGalleryDialog();
  const gltf = useLoader(GLTFLoader, modelSrc, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const runActionRef = useRef<THREE.AnimationAction | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  const [destination, setDestination] = useState<THREE.Vector3 | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  useImperativeHandle(ref, () => ({
    startMove: (target: THREE.Vector3) => {
      target.y = 0.7;
      setDestination(target);
      setIsMoving(true);

      if (runActionRef.current) {
        if (currentActionRef.current !== runActionRef.current) {
          mixerRef.current?.stopAllAction();
          runActionRef.current.reset().play();
          currentActionRef.current = runActionRef.current;
        }
      }
    },
    stopMove: () => {
      setIsMoving(false);
      setDestination(null);
      currentActionRef.current?.stop();
      currentActionRef.current = null;
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

    mixerRef.current = new THREE.AnimationMixer(model);
    if (gltf.animations.length > 0) {
      const runClip = gltf.animations.find((clip) => clip.name.toLowerCase().includes("run"));
      if (runClip) {
        runActionRef.current = mixerRef.current.clipAction(runClip);
        runActionRef.current.setLoop(THREE.LoopRepeat, Infinity);
        runActionRef.current.clampWhenFinished = false;
      }
    }
  }, [gltf]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isPaused) {
      mixerRef.current?.stopAllAction();
      setDestination(null);
      setIsMoving(false);
      currentActionRef.current = null;
      return;
    }

    mixerRef.current?.update(delta);

    if (isMoving && destination) {
      const pos = groupRef.current.position;
      const dir = destination.clone().sub(pos);
      const dist = dir.length();

      if (dist > 0.1) {
        dir.normalize();
        pos.add(dir.multiplyScalar(0.07));
        groupRef.current.lookAt(destination);
      } else {
        setIsMoving(false);
        setDestination(null);
        currentActionRef.current?.stop();
        currentActionRef.current = null;
      }
    }

    // 카메라 따라가기
    const targetPos = groupRef.current.position.clone();
    const cameraOffset = new THREE.Vector3(-4, 6, 8);
    const desiredPos = targetPos.clone().add(cameraOffset);
    camera.position.lerp(desiredPos, 0.1);
    camera.lookAt(groupRef.current.position);
  });

  return (
    <group ref={groupRef} position={[0, 0.7, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
});

Heendy.displayName = "Heendy";
export default Heendy;
