import * as THREE from "three";

import { Box, useGLTF } from "@react-three/drei";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef, type JSX } from "react";
import { useLoader } from "@react-three/fiber";
import { useGalleryStore } from "@/store/gallery";
export const Img = (props: { src: string }) => {
  const colorMap = useLoader(THREE.TextureLoader, props.src);
  return <meshStandardMaterial side={THREE.DoubleSide} map={colorMap} />;
};
type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    roof: THREE.MeshStandardMaterial;
    wall: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
  };
};
export function Room(props: JSX.IntrinsicElements["group"] & { editor?: boolean }) {
  const { nodes, materials } = useGLTF("/assets/gallery/simple_room_solidify_0.17.glb") as unknown as GLTFResult;
  const circleRef = useRef<THREE.Mesh>(null);
  const store = useGalleryStore();
  return (
    <>
      {store.selectedImage && (
        <Box args={[4, 4, 0.2]} ref={circleRef}>
          <Img src={store.selectedImage} />
        </Box>
      )}
      <group
        {...props}
        onPointerMove={({ intersections }) => {
          const point = intersections?.at(0)?.point;
          if (!point) return;
          if (!circleRef.current) return;
          circleRef.current.position.z = point.z;
          circleRef.current.position.x = point.x;
          circleRef.current.position.y = point.y;
          circleRef.current.lookAt(0, point.y, 0);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!store.selectedImage) return;
          const uuid = new THREE.Object3D().uuid;
          if (!circleRef.current) return;
          const [x, y, z] = circleRef.current.position.toArray();
          const [rx, ry, rz, order] = circleRef.current.rotation.toArray();
          const eulerOrder = order as THREE.EulerOrder;
          store.selectImage(undefined);
          store.addFrame({
            uuid,
            position: [x, y, z],
            rotation: [rx, ry, rz, eulerOrder],
            img: store.selectedImage,
          });
        }}
        castShadow
        scale={2}
        dispose={null}
        position={[2, 1.5, 2]}
      >
        <group position={[0, 1.5, 0]} scale={[1, 1, 1.2]}>
          <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.roof} />
          <mesh castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials.wall} />
          <mesh castShadow receiveShadow geometry={nodes.Cube_3.geometry} material={materials.floor} />
        </group>
        <group position={[9, 1.5, -3]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.2]}>
          <mesh castShadow receiveShadow geometry={nodes.Cube002_1.geometry} material={materials.roof} />
          <mesh castShadow receiveShadow geometry={nodes.Cube002_2.geometry} material={materials.wall} />
          <mesh castShadow receiveShadow geometry={nodes.Cube002_3.geometry} material={materials.floor} />
        </group>
        <group position={[9, 1.5, 3]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.2]}>
          <mesh castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.roof} />
          <mesh castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials.wall} />
          <mesh castShadow receiveShadow geometry={nodes.Cube003_2.geometry} material={materials.floor} />
        </group>{" "}
      </group>
    </>
  );
}

useGLTF.preload("/assets/gallery/simple_room_solidify_0.17.glb");
