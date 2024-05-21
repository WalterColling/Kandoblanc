import React, { useRef } from "react";
import Floor from "./Floor";
import { Environment, useHelper } from "@react-three/drei";

function SceneEnv({ color }) {
  const groupRef = useRef();

  return (
    <>
      <fog attach="fog" args={[color, 0.5, 3]} />
      <color attach="background" args={[color]} />

      <group ref={groupRef}>
        <Environment
          preset="studio"
          background={false}
          environmentRotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <ambientLight intensity={2} />

      <Floor color={color} />
    </>
  );
}

export default SceneEnv;
