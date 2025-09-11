import * as THREE from "three";
import { Box, useGLTF } from "@react-three/drei";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import { useGalleryStore } from "@/store/gallery";
import { useRef, type JSX } from "react";

export const Img = (props: { src: string }) => {
  const colorMap = useLoader(THREE.TextureLoader, props.src);
  return <meshStandardMaterial side={THREE.DoubleSide} map={colorMap} />;
};

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    roof: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
  };
};

function GalleryRoom(props: JSX.IntrinsicElements["group"] & { editor?: boolean }) {
  const { nodes, materials } = useGLTF("/assets/gallery/room.glb") as unknown as GLTFResult;
  const circleRef = useRef<THREE.Mesh>(null);
  const store = useGalleryStore();

  return (
    <>
      {store.selectedImage && (
        <Box args={[4, 4, 0.2]} ref={circleRef}>
          <Img src={store.selectedImage} />
        </Box>
      )}

      <group {...props} castShadow scale={2} dispose={null} position={[2, 1.5, 2]}>
        <RigidBody type="fixed" colliders="trimesh">
          <group position={[0, 1.5, 0]} scale={[1, 1, 1.2]}>
            <mesh geometry={nodes.Cube_1.geometry}>
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            <mesh geometry={nodes.Cube_3.geometry}>
              <meshStandardMaterial {...materials.floor} name="floor" />
            </mesh>
          </group>

          <group position={[9, 1.5, -3]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.2]}>
            <mesh geometry={nodes.Cube002_1.geometry}>
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            <mesh geometry={nodes.Cube002_3.geometry}>
              <meshStandardMaterial {...materials.floor} name="floor" />
            </mesh>
          </group>

          <group position={[9, 1.5, 3]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.2]}>
            <mesh geometry={nodes.Cube003.geometry}>
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            <mesh geometry={nodes.Cube003_2.geometry}>
              <meshStandardMaterial {...materials.floor} name="floor" />
            </mesh>
          </group>
        </RigidBody>
      </group>
    </>
  );
}

useGLTF.preload("/assets/gallery/room.glb");

export default GalleryRoom;
