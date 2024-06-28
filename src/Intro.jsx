import React from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import Stage from "./components/Stage";
import { BottleIntro } from "./components/BottleIntroAnimation";
import { OrbitControls } from "@react-three/drei";

function Intro() {
  // Leva UI control for color
  const { colorbg } = useControls({
    colorbg: { value: "#18181E", label: "Background Color" },
  });

  return (
    <Canvas
      gl={{ antialias: false }}
      shadows
      dpr={[2, 4]}
      camera={{ position: [0, 0.1, 1], fov: 25, near: 0.1, far: 35 }}
    >
      {/* <Perf position="top-left" /> */}

      <Stage color={colorbg} />
      <BottleIntro />

      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={1.5}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        target={[0, 0.17, 0]}
      />
    </Canvas>
  );
}

export default Intro;
