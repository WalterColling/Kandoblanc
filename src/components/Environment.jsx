import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import Floor from "./Floor";
import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
  Shadow,
  SoftShadows,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";

function SceneEnv({ color }) {
  const directionLight = useRef();
  useHelper(directionLight, THREE.DirectionalLightHelper, 0.5);

  return (
    <>
      <fog attach="fog" args={[color, 1, 6]} />
      <color attach="background" args={[color]} />

      {/* <directionalLight
        ref={directionLight}
        castShadow
        shadow-mapSize={2048}
        intensity={5}
      /> */}
      <Environment
        preset="studio"
        environmentRotation={[0, Math.PI / 2.2, 0]}
      />
      <ambientLight intensity={0.5} />

      <AccumulativeShadows
        temporal
        frames={300}
        color={color}
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.75}
        opacity={1}
        scale={4}
      >
        <RandomizedLight
          intensity={Math.PI}
          amount={8}
          radius={4}
          ambient={0.5}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <Floor color={color} />

      {/* <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group> */}
    </>
  );
}

export default SceneEnv;
