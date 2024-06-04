import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import Stage from "./components/Stage";
import CameraRigScroll from "./components/CameraRigScroll";
import BottleScrollHTML from "./components/html/BottleScrollHTML";
import BottleScroll from "./components/BottleScroll";

function ObjectPage() {
  let colorbg = "#18181E";

  return (
    <Canvas
      gl={{ antialias: false }}
      shadows
      dpr={[2, 4]}
      camera={{ position: [0, 0.2, 1.5], fov: 30, near: 0.1, far: 35 }}
    >
      <Stage color={colorbg} />
      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        target={[0, 0.17, 0]}
      />
      <ScrollControls pages={6} damping={0.3}>
        <Scroll html>
          <BottleScrollHTML />
        </Scroll>

        <BottleScroll />

        <CameraRigScroll />
      </ScrollControls>
    </Canvas>
  );
}

export default ObjectPage;
