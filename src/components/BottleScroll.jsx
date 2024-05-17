import React, { useEffect, useLayoutEffect, useRef } from "react";
import { TransformControls, useGLTF, useScroll } from "@react-three/drei";
import { Color } from "three";

import { eventHandler } from "./EventHandlers";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { useControls } from "leva";
import DraggableElement from "./DraggableElement";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Liquid } from "./Materials/M-Liquid";

export function BottleScroll(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();
  const timeline = useRef();
  const scroll = useScroll();

  useEffect(() => {
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00));
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }
  }, [materials]); // This ensures the effect runs when materials are loaded

  useFrame(() => {
    const targetY = scroll.offset * 2;
    gsap.to(bottle.current.position, { duration: 1, y: targetY });
  });

  useLayoutEffect(() => {
    timeline.current = gsap.timeline();
    timeline.current.to(bottle.current.position, { duration: 1 });
  }, []);

  return (
    <group ref={obj} {...props} dispose={null}>
      <group ref={bottle}>
        <mesh
          name="Bottle1"
          castShadow
          geometry={nodes.Bottle1.geometry}
          material={materials.Mat}
          position={[0, 0.053, 0]}
        >
          <BaseTransmission />
        </mesh>
        <mesh
          name="Liquid1"
          castShadow
          geometry={nodes.Liquid1.geometry}
          material={materials.Mat}
          position={[0, 0.053, 0]}
        >
          <Liquid />
        </mesh>
      </group>
      {/* <TransformControls object={bottle} /> */}

      <group ref={top}>
        <mesh
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
      </group>
      {/* <TransformControls object={top} /> */}

      <group ref={neck}>
        <mesh
          name="Neck"
          castShadow
          geometry={nodes.Neck.geometry}
          material={materials.Mat}
          position={[0, 0.181, 0]}
        >
          <BaseBottle />
        </mesh>
      </group>
      {/* <TransformControls object={neck} /> */}
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");

//last changed
