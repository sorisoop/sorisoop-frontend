import { useRef, useEffect } from "react";
import { Box3, Vector3 } from "three";
import * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import { GalleryRoom, GradientBackground, Heendy, Lighting } from "@/features/gallery/components";
import type { HeendyRef } from "@/features/gallery/components/heendy";
import { useGalleryDialog } from "@/features/gallery/hooks";

export default function Scene() {
  const { camera, scene, gl } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const heendyRef = useRef<HeendyRef>(null);
  const roomBoundsRef = useRef<{ min: Vector3; max: Vector3 } | null>(null);
  const { isPaused } = useGalleryDialog();

  useEffect(() => {
    const room = scene.getObjectByName("Room");
    if (room) {
      const box = new Box3().setFromObject(room);
      roomBoundsRef.current = { min: box.min, max: box.max };
    }
  }, [scene]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (isPaused) return;

      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() !== "canvas") return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const floorObjects = scene.children.filter((child) => {
        if (child.type === "Mesh") {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.Material;
          return material?.name === "floor";
        }
        return false;
      });

      let intersects = raycaster.intersectObjects(floorObjects, true);

      if (intersects.length === 0) {
        intersects = raycaster.intersectObjects(scene.children, true).slice(0, 3);
      }

      if (intersects.length > 0 && roomBoundsRef.current) {
        const hit = intersects[0];
        const targetPos = hit.point.clone();
        const { min, max } = roomBoundsRef.current;

        if (targetPos.x > min.x && targetPos.x < max.x && targetPos.z > min.z && targetPos.z < max.z) {
          targetPos.y = 0.7;
          heendyRef.current?.moveTo(targetPos);
        }
      }
    };

    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [camera, scene, gl, isPaused]);

  return (
    <>
      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <GalleryRoom name="Room" />
        </RigidBody>
        <Heendy ref={heendyRef} modelSrc="/assets/gallery/heendy.glb" />
      </Physics>
      <Lighting />
      <GradientBackground />
    </>
  );
}
