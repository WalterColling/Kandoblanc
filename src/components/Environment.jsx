import React, { useRef } from "react";

import { Color } from "three";
import Floor from "./Floor";
import { Environment, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";

function SceneEnv({ color }) {
  const groupRef = useRef();

  // const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

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

      {/* <directionalLight ref={directionalLight} intensity={0.5} /> */}

      <Floor color={color} />
    </>
  );
}

export default SceneEnv;
