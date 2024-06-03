import React, { useRef, useMemo } from "react";
import {
  Environment,
  Plane,
  MeshReflectorMaterial,
  ContactShadows,
  BakeShadows,
} from "@react-three/drei";
import { DirectionalLight } from "three";

function Stage({ color }) {
  const groupRef = useRef();
  // const fogArgs = useMemo(() => [color, 0.5, 3], [color]);
  const backgroundColor = useMemo(() => [color], [color]);

  const planeArgs = useMemo(() => [20, 20], []);
  const rotationArgs = useMemo(() => [-Math.PI / 2, 0, 0], []);
  const positionArgs = useMemo(() => [0, -0.15, 0], []);

  return (
    <>
      <color attach="background" args={backgroundColor} />

      <group ref={groupRef}>
        <Environment
          preset="studio"
          background={false}
          environmentRotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <ambientLight intensity={2} />
    </>
  );
}

export default Stage;
