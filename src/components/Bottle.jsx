import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Color } from "three";

import { eventHandler } from "./EventHandlers";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { useControls } from "leva";

export function Bottle(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  // // Enable rotation of the bottle
  // const { rotationEnabled } = useControls({
  //   rotationEnabled: {
  //     value: true,
  //     label: "Enable Rotation",
  //   },
  // });

  const liquid1 = useRef();
  const bottle1 = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();

  useEffect(() => {
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00));
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }
  }, [materials]); // This ensures the effect runs when materials are loaded

  // // Rotate the bottle
  // useFrame(() => {
  //   if (rotationEnabled && obj.current) {
  //     obj.current.rotation.y += 0.005;
  //   }
  // });

  return (
    <group ref={obj} {...props} dispose={null}>
      <mesh
        ref={bottle1}
        name="Bottle1"
        castShadow
        geometry={nodes.Bottle1.geometry}
        material={materials.Mat}
        position={[0, 0.053, 0]}
      >
        <BaseTransmission />
      </mesh>
      {/* <TransformControls object={bottle1} /> */}

      <mesh
        ref={liquid1}
        name="Liquid1"
        castShadow
        geometry={nodes.Liquid1.geometry}
        material={materials.Mat}
        position={[0, 0.053, 0]}
      >
        <BaseBottle />
      </mesh>

      {/* <TransformControls object={liquid1} /> */}
      <mesh
        ref={top}
        onClick={eventHandler}
        name="Top"
        castShadow
        geometry={nodes.Top.geometry}
        material={materials.Mat}
        position={[0, 0.245, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <BaseBottle />
      </mesh>
      {/* <TransformControls object={top} /> */}

      <mesh
        ref={neck}
        name="Neck"
        castShadow
        geometry={nodes.Neck.geometry}
        material={materials.Mat}
        position={[0, 0.181, 0]}
      >
        <BaseBottle />
      </mesh>
      {/* <TransformControls object={neck} /> */}
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
