import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useGalleryStore } from "@/store/gallery";
import { Img, Room } from "@/features/gallery/components";
import { Box } from "@react-three/drei";
import { Box3, Vector3 } from "three";

// ----------------- 타입 정의 -----------------
interface HeendyPlayerRef {
  moveTo: (target: THREE.Vector3) => void;
}
interface HeendyPlayerProps {
  modelSrc: string;
}

// ----------------- 밝은 전시관 배경 -----------------
function GradientBackground() {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color("#f9f9f9") }, // 천장: 흰색
        bottomColor: { value: new THREE.Color("#e0e0e0") }, // 바닥 근처: 연한 회색
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
        }
      `,
    });

    const sky = new THREE.Mesh(geometry, material);
    scene.add(sky);

    return () => {
      scene.remove(sky);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null;
}

// ----------------- HeendyPlayer -----------------
const HeendyPlayer = forwardRef<HeendyPlayerRef, HeendyPlayerProps>(({ modelSrc }, ref) => {
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
        pos.add(dir.multiplyScalar(0.05));
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
HeendyPlayer.displayName = "HeendyPlayer";

// ----------------- 벽 조명 -----------------

// ----------------- Scene -----------------
function Scene() {
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const heendyRef = useRef<HeendyPlayerRef>(null);

  const roomBoundsRef = useRef<{ min: Vector3; max: Vector3 } | null>(null);

  useEffect(() => {
    const room = scene.getObjectByName("Room");
    if (room) {
      const box = new Box3().setFromObject(room);
      roomBoundsRef.current = { min: box.min, max: box.max };
      console.log("Room 범위:", box.min, box.max);
    }
  }, [scene]);

  const handleClick = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let hit = intersects.find((i) => {
        const mat = (i.object as THREE.Mesh).material as THREE.Material;
        return mat?.name === "floor";
      });
      if (!hit) hit = intersects[0];

      if (hit && roomBoundsRef.current) {
        const target = hit.point.clone();
        const { min, max } = roomBoundsRef.current;

        if (target.x > min.x && target.x < max.x && target.z > min.z && target.z < max.z) {
          target.y = 0.7;
          heendyRef.current?.moveTo(target);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [camera, scene]);

  return (
    <>
      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <Room name="Room" />
        </RigidBody>
        <HeendyPlayer ref={heendyRef} modelSrc="/assets/gallery/heendy.glb" />
      </Physics>

      {/* 기본 밝기 */}
      <ambientLight intensity={0.4} />

      <GradientBackground />
    </>
  );
}

// ----------------- GalleryPage -----------------
export default function GalleryPage() {
  const store = useGalleryStore();

  return (
    <div className="w-screen h-screen relative">
      <Canvas shadows camera={{ fov: 60, position: [0, 10, 10] }}>
        {store.frames?.map((frame, index) => (
          <Box
            key={index}
            position={frame.position}
            rotation={frame.rotation as [number, number, number, THREE.EulerOrder]}
            scale={frame.scale}
            args={[4, 2, 0.2]}
          >
            <Img src={frame.img} />
          </Box>
        ))}
        <Scene />
      </Canvas>
    </div>
  );
}
