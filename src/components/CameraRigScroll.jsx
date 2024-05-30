import React, { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { useScroll } from "@react-three/drei";

function CameraRigScroll() {
  const { camera } = useThree();
  const scroll = useScroll();

  const positions = useMemo(
    () => [
      { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.35, 0] },
      { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.24, 0] },
      { position: [0, 0.25, 0.6], fov: 35, lookAt: [0, 0.08, 0] },
      { position: [0, 0.25, 0.5], fov: 35, lookAt: [0, 0.08, 0] },
      { position: [0, 0.28, 0.5], fov: 35, lookAt: [0, 0.08, 0] },
      { position: [0, 0.3, 0.5], fov: 35, lookAt: [0, 0.3, 0] },
      { position: [0, 0.37, 0.5], fov: 35, lookAt: [0, 0.3, 0] },
      { position: [0, 0.45, 0.5], fov: 35, lookAt: [0, 0.45, 0] },
      { position: [0, 0.5, 0.5], fov: 35, lookAt: [0, 0.45, 0] },
      { position: [0, 0.2, 0.6], fov: 35, lookAt: [0, 0.1, 0] },
    ],
    []
  );

  // Initialize target values for damping
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const targetFov = useRef(camera.fov);
  const currentPosVector = useRef(new Vector3());
  const nextPosVector = useRef(new Vector3());
  const currentLookAtVector = useRef(new Vector3());
  const nextLookAtVector = useRef(new Vector3());

  useFrame(() => {
    let offset = scroll.offset * (positions.length - 1);
    offset = Math.max(0, Math.min(offset, positions.length - 1));

    const currentIndex = Math.floor(offset);
    const nextIndex = Math.min(currentIndex + 1, positions.length - 1);
    const progress = offset - currentIndex;

    const currentPos = positions[currentIndex];
    const nextPos = positions[nextIndex];

    // Calculate target values
    currentPosVector.current.set(...currentPos.position);
    nextPosVector.current.set(...nextPos.position);
    targetPosition.current.lerpVectors(
      currentPosVector.current,
      nextPosVector.current,
      progress
    );

    currentLookAtVector.current.set(...currentPos.lookAt);
    nextLookAtVector.current.set(...nextPos.lookAt);
    targetLookAt.current.lerpVectors(
      currentLookAtVector.current,
      nextLookAtVector.current,
      progress
    );

    targetFov.current = MathUtils.lerp(currentPos.fov, nextPos.fov, progress);

    // Apply the calculated values directly to the camera's position, fov, and lookAt
    camera.position.copy(targetPosition.current);
    camera.fov = targetFov.current;
    camera.lookAt(targetLookAt.current);

    camera.updateProjectionMatrix();
  });

  return null;
}

export default CameraRigScroll;
