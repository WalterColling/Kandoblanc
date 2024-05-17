import React, { useEffect, useRef } from "react";
import { TransformControls, useGLTF } from "@react-three/drei";
import { Color } from "three";
import { gsap } from "gsap";

import { eventHandler } from "./EventHandlers";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { useControls } from "leva";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottleEx } from "./Materials/M-BaseBottleExtended";

export function Bottle(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();

  useEffect(() => {
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00));
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }
  }, [materials]); // ensures the effect runs when materials are loaded

  // // Rotate the bottle
  // useFrame(() => {
  //   if (rotationEnabled && obj.current) {
  //     obj.current.rotation.y += 0.005;
  //   }
  // });

  // Animate the bottle
  useEffect(() => {
    if (top.current) {
      gsap.from([top.current.position], {
        duration: 2.5,
        y: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, []);

  useEffect(() => {
    if (neck.current) {
      gsap.from([neck.current.position], {
        duration: 2.2,
        y: 0.3,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, []);

  return (
    <group ref={obj} {...props} dispose={null}>
      <group ref={bottle} rotaion>
        <mesh
          name="Bottle1"
          geometry={nodes.Bottle1.geometry}
          material={materials.Mat}
          position={[0, 0.053, 0]}
        >
          <BaseTransmission isColorMode={false} />
        </mesh>

        <mesh
          name="Liquid1"
          geometry={nodes.Liquid1.geometry}
          material={materials.Mat}
          position={[0, 0.053, 0]}
        >
          <Liquid />
        </mesh>
      </group>
      {/* <TransformControls object={bottle} /> */}

      <mesh
        ref={top}
        onClick={eventHandler}
        name="Top"
        geometry={nodes.Top.geometry}
        material={materials.Mat}
        position={[0, 0.245, 0]}
        rotation={[-Math.PI / 2, 0, 1.4]}
      >
        <BaseBottleEx isBaseColor={false} />
      </mesh>
      {/* <TransformControls object={top} /> */}

      <mesh
        ref={neck}
        name="Neck"
        geometry={nodes.Neck.geometry}
        material={materials.Mat}
        position={[0, 0.181, 0]}
        rotation={[0, 0.1, 0]}
      >
        <BaseBottleEx isBaseColor={false} />
      </mesh>
      {/* <TransformControls object={neck} /> */}
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
