import React, { useEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { Color, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";

export function BottleScroll(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();
  const scroll = useScroll();

  // Define positions and rotations for each step
  const positions = [
    { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.2, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.2, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
    { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
  ];

  // Initialize target values
  const targetBottlePosition = useRef(new Vector3());
  const targetTopPosition = useRef(new Vector3());
  const targetNeckPosition = useRef(new Vector3());

  useEffect(() => {
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00));
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }
  }, [materials]); // This ensures the effect runs when materials are loaded

  useFrame(() => {
    const offset = scroll.offset * (positions.length - 1);
    const currentIndex = Math.floor(offset);
    const nextIndex = Math.min(currentIndex + 1, positions.length - 1);
    const progress = offset - currentIndex;

    const currentPos = positions[currentIndex];
    const nextPos = positions[nextIndex];

    // Calculate target values
    targetBottlePosition.current.lerpVectors(
      new Vector3(...currentPos.bottle),
      new Vector3(...nextPos.bottle),
      progress
    );

    targetTopPosition.current.lerpVectors(
      new Vector3(...currentPos.top),
      new Vector3(...nextPos.top),
      progress
    );

    targetNeckPosition.current.lerpVectors(
      new Vector3(...currentPos.neck),
      new Vector3(...nextPos.neck),
      progress
    );

    // Apply the calculated values directly to the positions
    bottle.current.position.copy(targetBottlePosition.current);
    top.current.position.copy(targetTopPosition.current);
    neck.current.position.copy(targetNeckPosition.current);
  });

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

      <group ref={top}>
        <mesh
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
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
