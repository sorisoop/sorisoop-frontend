import { useState } from "react";
import * as THREE from "three";
import { useGalleryStore } from "@/store/gallery";
import { Box, KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Img, Room } from "@/features/gallery/components";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctr from "ecctrl";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
];

export default function GalleryPage() {
  const store = useGalleryStore();
  const [selected, setSelected] = useState<string | undefined | null>(null);
  return (
    <div className="w-screen h-screen">
      <dialog id="my_modal_2" className="modal">
        <div className="max-w-screen-xl h-full w-fit modal-box">
          <img src={selected ?? ""} alt="selected" className="object-scale-down w-full h-full" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Canvas style={{ backgroundColor: "#555555" }} className="w-full h-full">
        <OrbitControls />
        {store.frames.map((v) => (
          <Box
            position={v.position}
            rotation={v.rotation as [number, number, number, THREE.EulerOrder]}
            scale={v.scale}
            args={[4, 4, 0.2]}
          >
            <Img src={v.img} />
          </Box>
        ))}
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <Physics>
          <RigidBody type="fixed" colliders="trimesh">
            <Room />
          </RigidBody>

          <KeyboardControls map={keyboardMap}>
            <Ecctr
              maxVelLimit={10}
              camCollision={false} // disable camera collision detect (useless in FP mode)
              camInitDis={-0.01} // camera intial position
              camMinDis={-0.01} // camera zoom in closest position
              camFollowMult={1000} // give a big number here, so the camera follows the target (character) instantly
              camLerpMult={1000} // give a big number here, so the camera lerp to the followCam position instantly
              turnVelMultiplier={1} // Turning speed same as moving speed
              turnSpeed={100} // give it big turning speed to prevent turning wait time
              mode="CameraBasedMovement" // character's rotation will follow camera's rotation in this mode
            >
              <pointLight position={[0, 2, 0]} intensity={50} color="#fff" />
            </Ecctr>
          </KeyboardControls>
          <ambientLight />
        </Physics>
      </Canvas>
    </div>
  );
}
