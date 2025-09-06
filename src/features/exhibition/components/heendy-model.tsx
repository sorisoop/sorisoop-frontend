import { forwardRef, useEffect, type JSX } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export type HeendyModelProps = JSX.IntrinsicElements["group"] & {
  url?: string;
  scale?: number;
  playing?: boolean;
};

const HeendyModel = forwardRef<THREE.Group, HeendyModelProps>(
  (
    {
      url = "/assets/exhibition/models/heendy.glb",
      scale = 0.1,
      position = [0, -0.2, 5],
      rotation = [0, Math.PI, 0],
      playing = false,
      ...props
    },
    ref
  ) => {
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
      if (!actions) return;
      const walkAction = actions["Running"] || actions[Object.keys(actions)[0]];

      if (playing) {
        walkAction?.reset().fadeIn(0.2).play();
      } else {
        walkAction?.fadeOut(0.2);
      }
    }, [playing, actions]);

    return <primitive ref={ref} object={scene} scale={scale} position={position} rotation={rotation} {...props} />;
  }
);

export default HeendyModel;

useGLTF.preload("/assets/exhibition/models/heendy.glb");
