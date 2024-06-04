import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import Stage from "./components/Stage";

import LoadingContext from "./components/LoadingContext";
import { BottleIntro } from "./components/BottleIntroAnimation";
import { OrbitControls } from "@react-three/drei";

function Intro() {
  let colorbg = "#18181E";

  // const { setObjectLoaded } = useContext(LoadingContext);

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
        autoRotateSpeed={0.5}
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
