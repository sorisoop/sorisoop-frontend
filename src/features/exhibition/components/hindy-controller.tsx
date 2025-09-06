import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import HeendyModel from "./heendy-model";

export default function HeendyController() {
  const heendyRef = useRef<THREE.Group>(null);
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, -0.2, 5));
  const [isMoving, setIsMoving] = useState(false);

  useFrame((state, dt) => {
    if (!heendyRef.current) return;

    const dist = heendyRef.current.position.distanceTo(targetPos);

    if (dist > 0.05) {
      setIsMoving(true);

      const speed = THREE.MathUtils.clamp(dist * 0.1, 0.05, 0.2);
      easing.damp3(heendyRef.current.position, targetPos, speed, dt);

      // 캐릭터 방향 전환
      const dir = targetPos.clone().sub(heendyRef.current.position);
      heendyRef.current.lookAt(
        heendyRef.current.position.x + dir.x,
        heendyRef.current.position.y,
        heendyRef.current.position.z + dir.z
      );
    } else {
      setIsMoving(false);
    }

    // ✅ 카메라 따라가기
    const heendyPos = heendyRef.current.position;
    const camTarget = new THREE.Vector3(heendyPos.x, heendyPos.y + 2, heendyPos.z + 6);
    easing.damp3(state.camera.position, camTarget, 0.1, dt);
    state.camera.lookAt(heendyPos);
  });

  return (
    <>
      <HeendyModel ref={heendyRef} scale={0.1} playing={isMoving} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0]}
        onClick={(e) => {
          const { x, z } = e.point;
          setTargetPos(new THREE.Vector3(x, -0.2, z));
        }}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </>
  );
}
