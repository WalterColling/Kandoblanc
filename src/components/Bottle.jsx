import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import LoadingContext from "./LoadingContext";
import { useGLTF } from "@react-three/drei";
import BottlePart from "./BottlePart";

// function to create the bottle object in the landing page

export function Bottle(props) {
  const { nodes } = useGLTF("/Kandoblanc.gltf");
  const { setObjectLoaded } = useContext(LoadingContext);

  const bottle = useRef();
  const top = useRef();
  const neck = useRef();
  const obj = useRef();

  useEffect(() => {
    if (nodes) {
      setObjectLoaded(true);
    }
  }, [nodes, setObjectLoaded]);

  useEffect(() => {
    if (setObjectLoaded && top.current) {
      gsap.from([top.current.position], {
        duration: 2.5,
        y: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, [setObjectLoaded]);

  useEffect(() => {
    if (setObjectLoaded && neck.current) {
      gsap.from([neck.current.position], {
        duration: 2.2,
        y: 0.3,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, [setObjectLoaded]);

  return (
    <group ref={obj} {...props} dispose={null}>
      <group ref={bottle}>
        <BottlePart
          name="Bottle1"
          geometry={nodes.Bottle1.geometry}
          position={[0, 0.053, 0]}
          type="BaseTransmission"
        />
        <BottlePart
          name="Liquid1"
          geometry={nodes.Liquid1.geometry}
          position={[0, 0.053, 0]}
          type="Liquid"
        />
      </group>
      <BottlePart
        ref={top}
        name="Top"
        geometry={nodes.Top.geometry}
        position={[0, 0.245, 0]}
        rotation={[-Math.PI / 2, 0, 1.4]}
        type="BaseBottleEx"
      />
      <BottlePart
        ref={neck}
        name="Neck"
        geometry={nodes.Neck.geometry}
        position={[0, 0.181, 0]}
        rotation={[0, 0.1, 0]}
        type="BaseBottleEx"
      />
    </group>
  );
}

useGLTF.preload("/Kandoblanc.gltf");
