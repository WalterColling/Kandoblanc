import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { useControls } from "leva";
import Stage from "./components/Stage";
import CameraRigScroll from "./components/CameraRigScroll";
import BottleScrollHTML from "./components/html/BottleScrollHTML";
import BottleScroll from "./components/BottleScroll";
import ConstantRotation from "./components/ConstantRotation";

function ObjectPage() {
  // Leva UI control for color
  // const { colorbg } = useControls({
  //   colorbg: { value: "#18181E", label: "Background Color" },
  // });

  return (
    <Canvas
      gl={{ antialias: false }}
      shadows
      dpr={[2, 4]}
      camera={{ position: [0, 0.2, 1.5], fov: 30, near: 0.1, far: 35 }}
    >
      <Stage color={"#18181E"} />

      <ScrollControls pages={5} damping={0.3}>
        <Scroll html>
          <BottleScrollHTML />
        </Scroll>
        <ConstantRotation>
          <BottleScroll />
        </ConstantRotation>

        <CameraRigScroll />
      </ScrollControls>
    </Canvas>
  );
}

export default ObjectPage;
