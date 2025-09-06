import * as THREE from "three";

export type ImageItem = {
  position: [number, number, number];
  rotation: [number, number, number];
  url: string;
};

export type FrameProps = ImageItem & {
  c?: THREE.Color;
};
