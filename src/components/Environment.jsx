import React from "react";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import Floor from "./Floor";
import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
} from "@react-three/drei";

function SceneEnv({ color }) {
  const { scene } = useThree();

  // Set the background color of the scene
  scene.background = new Color(color);

  return (
    <>
      <Environment preset="city" background blur={1} />
      <ambientLight intensity={1} />
      <Floor color={color} />
      {/* 
      <AccumulativeShadows
        temporal
        frames={100}
        alphaTest={0.85}
        opacity={0.85}
        scale={12}
      >
        <RandomizedLight
          amount={8}
          radius={5}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -5]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
    </>
  );
}

export default SceneEnv;
