import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { Color, Vector3, Euler, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottle } from "./Materials/M-BaseBottle";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { BaseBottleEx } from "./Materials/M-BaseBottleExtended";

export function BottleScroll(props) {
  const { nodes, materials } = useGLTF("/Kandoblanc.gltf");

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();
  const scroll = useScroll();

  // State for hover
  const [hoveredBottle, setHoveredBottle] = useState(false);
  const [hoveredTop, setHoveredTop] = useState(false);
  const [hoveredNeck, setHoveredNeck] = useState(false);

  // State for last index
  const [atLastIndex, setAtLastIndex] = useState(false);

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

  // Rotation references
  const bottleRotation = useRef(new Euler());
  const topRotation = useRef(new Euler());
  const neckRotation = useRef(new Euler());

  // Original rotations for resetting
  const originalBottleRotation = useRef(new Euler());
  const originalTopRotation = useRef(new Euler());
  const originalNeckRotation = useRef(new Euler());

  useEffect(() => {
    if (materials.Mat) {
      materials.Mat.color.set(new Color(0x00ff00));
      materials.Mat.needsUpdate = true; // Inform Three.js to update the material
    }

    // Store the original rotations
    originalBottleRotation.current.copy(bottle.current.rotation);
    originalTopRotation.current.copy(top.current.rotation);
    originalNeckRotation.current.copy(neck.current.rotation);
  }, [materials]); // This ensures the effect runs when materials are loaded

  useFrame((state, delta) => {
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

    // Determine if the last index is reached
    const atLastIndexNow = scroll.offset >= 1.0;
    if (atLastIndexNow !== atLastIndex) {
      setAtLastIndex(atLastIndexNow);
    }

    // Update rotations for spinning effect when hovered or last index is reached
    if (hoveredBottle || atLastIndex) {
      bottleRotation.current.y += 0.01; // Adjust speed as needed
    } else {
      bottleRotation.current.y = MathUtils.damp(
        bottleRotation.current.y,
        getClosestRotation(
          bottleRotation.current.y,
          originalBottleRotation.current.y
        ),
        4, // Slower damping factor
        delta
      );
    }

    if (hoveredTop || atLastIndex) {
      topRotation.current.y += 0.01; // Adjust speed as needed
    } else {
      topRotation.current.y = MathUtils.damp(
        topRotation.current.y,
        getClosestRotation(
          topRotation.current.y,
          originalTopRotation.current.y
        ),
        4, // Slower damping factor
        delta
      );
    }

    if (hoveredNeck || atLastIndex) {
      neckRotation.current.y += 0.01; // Adjust speed as needed
    } else {
      neckRotation.current.y = MathUtils.damp(
        neckRotation.current.y,
        getClosestRotation(
          neckRotation.current.y,
          originalNeckRotation.current.y
        ),
        4, // Slower damping factor
        delta
      );
    }

    // Apply rotations
    bottle.current.rotation.copy(bottleRotation.current);
    top.current.rotation.copy(topRotation.current);
    neck.current.rotation.copy(neckRotation.current);
  });

  const getClosestRotation = (current, original) => {
    const currentRot =
      ((current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); // normalize to [0, 2PI]
    const originalRot =
      ((original % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); // normalize to [0, 2PI]
    const deltaRot = currentRot - originalRot;

    if (deltaRot > Math.PI) return originalRot + Math.PI * 2;
    if (deltaRot < -Math.PI) return originalRot - Math.PI * 2;
    return originalRot;
  };

  return (
    <group ref={obj} {...props} dispose={null}>
      <group
        ref={bottle}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHoveredBottle(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHoveredBottle(false);
        }}
      >
        <mesh
          name="Bottle1"
          castShadow
          geometry={nodes.Bottle1.geometry}
          material={materials.Mat}
          position={[0, 0.053, 0]}
        >
          <BaseTransmission isColorMode={hoveredBottle || atLastIndex} />
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

      <group
        ref={top}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHoveredTop(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHoveredTop(false);
        }}
      >
        <mesh
          name="Top"
          castShadow
          geometry={nodes.Top.geometry}
          material={materials.Mat}
          position={[0, 0.245, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <BaseBottleEx isBaseColor={hoveredTop || atLastIndex} />
        </mesh>
      </group>

      <group
        ref={neck}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHoveredNeck(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHoveredNeck(false);
        }}
      >
        <mesh
          name="Neck"
          castShadow
          geometry={nodes.Neck.geometry}
          material={materials.Mat}
          position={[0, 0.181, 0]}
        >
          <BaseBottleEx isBaseColor={hoveredNeck || atLastIndex} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
