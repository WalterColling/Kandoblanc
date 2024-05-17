import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { CameraHelper, Vector3 } from "three";
import { useControls } from "leva";

export function CameraWithHelperComponent() {
  const cameraRef = useRef();
  const { fov, near, far, position, lookAt } = useControls("Camera", {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5],
    lookAt: [0, 0, 0],
  });

  useHelper(cameraRef.current, CameraHelper, "cyan");

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(new Vector3(...lookAt));
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      fov={fov}
      near={near}
      far={far}
      position={position}
      makeDefault
    />
  );
}
