import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { useScroll, ScrollControls } from "@react-three/drei";

function CameraRigScroll() {
  const { camera } = useThree();
  const scroll = useScroll();

  const positions = [
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.35, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.24, 0] },
    { position: [0, 0.3, 0.9], fov: 35, lookAt: [0, 0.11, 0] },
    { position: [0, 0.1, 0.5], fov: 35, lookAt: [0, 0.11, 0] },
    { position: [0, 0.1, 0.5], fov: 35, lookAt: [0, 0.32, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.32, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.57, 0] },
  ];

  // Initialize target values for damping
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const targetFov = useRef(camera.fov);

  useFrame((state, delta) => {
    const offset = scroll.offset * (positions.length - 1);
    const currentIndex = Math.floor(offset);
    const nextIndex = Math.min(currentIndex + 1, positions.length - 1);
    const progress = offset - currentIndex;

    const currentPos = positions[currentIndex];
    const nextPos = positions[nextIndex];

    // Calculate target values
    targetPosition.current.lerpVectors(
      new Vector3(...currentPos.position),
      new Vector3(...nextPos.position),
      progress
    );

    targetLookAt.current.lerpVectors(
      new Vector3(...currentPos.lookAt),
      new Vector3(...nextPos.lookAt),
      progress
    );

    targetFov.current = MathUtils.lerp(currentPos.fov, nextPos.fov, progress);

    // Apply damping to the camera's position, fov, and lookAt
    camera.position.lerp(
      targetPosition.current,
      MathUtils.damp(0, 1, 8, delta)
    );
    camera.fov = MathUtils.damp(camera.fov, targetFov.current, 8, delta);
    camera.lookAt(
      camera.position
        .clone()
        .lerp(targetLookAt.current, MathUtils.damp(0, 1, 8, delta))
    );

    camera.updateProjectionMatrix();
  });

  return null;
}

export default CameraRigScroll;
