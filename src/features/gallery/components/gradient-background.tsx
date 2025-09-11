import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function GradientBackground() {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color("#f9f9f9") },
        bottomColor: { value: new THREE.Color("#e0e0e0") },
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
