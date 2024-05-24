import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLerpPosition } from "./useLerpPosition";
import { useSmoothRotation } from "./useSmoothRotation";
import BottlePart from "./BottlePart";
import { Euler } from "three";

export function BottleScroll(props) {
  const { nodes } = useGLTF("/Kandoblanc.gltf");
  const scroll = useScroll();

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();

  const [hovered, setHovered] = useState({
    bottle: false,
    top: false,
    neck: false,
  });
  const [atLastIndex, setAtLastIndex] = useState(false);

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

  const bottlePositions = positions.map((p) => p.bottle);
  const topPositions = positions.map((p) => p.top);
  const neckPositions = positions.map((p) => p.neck);

  const updateBottlePosition = useLerpPosition(bottlePositions);
  const updateTopPosition = useLerpPosition(topPositions);
  const updateNeckPosition = useLerpPosition(neckPositions);

  const updateBottleRotation = useSmoothRotation(new Euler());
  const updateTopRotation = useSmoothRotation(new Euler());
  const updateNeckRotation = useSmoothRotation(new Euler());

  useEffect(() => {
    if (nodes) {
      updateBottleRotation(bottle, false, 0); // Initialize rotations
      updateTopRotation(top, false, 0);
      updateNeckRotation(neck, false, 0);
    }
  }, [nodes, updateBottleRotation, updateTopRotation, updateNeckRotation]);

  useFrame((state, delta) => {
    const offset = scroll.offset * (positions.length - 1);

    updateBottlePosition(bottle, offset);
    updateTopPosition(top, offset);
    updateNeckPosition(neck, offset);

    const atLastIndexNow = scroll.offset >= 1.0;
    if (atLastIndexNow !== atLastIndex) {
      setAtLastIndex(atLastIndexNow);
    }

    updateBottleRotation(bottle, hovered.bottle || atLastIndex, delta);
    updateTopRotation(top, hovered.top || atLastIndex, delta);
    updateNeckRotation(neck, hovered.neck || atLastIndex, delta);
  });

  const handlePointerOver = (part) => (event) => {
    event.stopPropagation();
    setHovered((prev) => ({ ...prev, [part]: true }));
  };

  const handlePointerOut = (part) => (event) => {
    event.stopPropagation();
    setHovered((prev) => ({ ...prev, [part]: false }));
  };

  return (
    <group ref={obj} {...props} dispose={null}>
      <group
        ref={bottle}
        onPointerOver={handlePointerOver("bottle")}
        onPointerOut={handlePointerOut("bottle")}
      >
        <BottlePart
          name="Bottle1"
          geometry={nodes.Bottle1.geometry}
          position={[0, 0.053, 0]}
          type="BaseTransmission"
          hoverEffect={hovered.bottle || atLastIndex}
        />
        <BottlePart
          name="Liquid1"
          geometry={nodes.Liquid1.geometry}
          position={[0, 0.053, 0]}
          type="Liquid"
          hoverEffect={hovered.bottle || atLastIndex}
        />
      </group>

      <group
        ref={top}
        onPointerOver={handlePointerOver("top")}
        onPointerOut={handlePointerOut("top")}
      >
        <BottlePart
          name="Top"
          geometry={nodes.Top.geometry}
          position={[0, 0.245, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          type="BaseBottleEx"
          hoverEffect={hovered.top || atLastIndex}
        />
      </group>

      <group
        ref={neck}
        onPointerOver={handlePointerOver("neck")}
        onPointerOut={handlePointerOut("neck")}
      >
        <BottlePart
          name="Neck"
          geometry={nodes.Neck.geometry}
          position={[0, 0.181, 0]}
          type="BaseBottleEx"
          hoverEffect={hovered.neck || atLastIndex}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
