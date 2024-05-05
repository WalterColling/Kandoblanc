import React, { useEffect, useRef } from "react";
import {
  MeshTransmissionMaterial,
  TransformControls,
  useGLTF,
} from "@react-three/drei";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";
import { eventHandler } from "./EventHandlers";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";

export function Bottle(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  const liquid1 = useRef();
  const bottle1 = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();

  useEffect(() => {
    // Set the color of the Bottle material to green
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00)); // Green
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }
  }, [materials]); // This ensures the effect runs when materials are loaded

  useFrame(() => {
    // Rotate the entire group by modifying its rotation.y property
    if (obj.current) {
      obj.current.rotation.y += 0.005; // Adjust rotation speed as needed
    }
  });

  return (
    <group ref={obj} {...props} dispose={null}>
      <mesh
        ref={liquid1}
        name="Liquid1"
        castShadow
        receiveShadow
        geometry={nodes.Liquid1.geometry}
        material={materials.Mat}
        position={[0, 0.053, 0]}
      >
        <BaseBottle />
      </mesh>
      <TransformControls object={liquid1} />

      <mesh
        ref={bottle1}
        name="Bottle1"
        castShadow
        receiveShadow
        geometry={nodes.Bottle1.geometry}
        material={materials.Mat}
        position={[0, 0.053, 0]}
      >
        <BaseTransmission />
      </mesh>
      <TransformControls object={bottle1} />

      <mesh
        ref={top}
        onClick={eventHandler}
        name="Top"
        castShadow
        receiveShadow
        geometry={nodes.Top.geometry}
        material={materials.Mat}
        position={[0, 0.245, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <BaseBottle />
      </mesh>
      <TransformControls object={top} />

      <mesh
        ref={neck}
        name="Neck"
        castShadow
        receiveShadow
        geometry={nodes.Neck.geometry}
        material={materials.Mat}
        position={[0, 0.181, 0]}
      >
        <BaseBottle />
      </mesh>
      <TransformControls object={neck} />
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
