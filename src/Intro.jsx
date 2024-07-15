import React from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import Stage from "./components/Stage";
import { BottleIntro } from "./components/BottleIntroAnimation";
import { OrbitControls } from "@react-three/drei";
import CameraRig from "./components/CameraRig";
import DraggableElement from "./components/DraggableElement";

function Intro() {
  // // Leva UI control for color
  // const { colorbg } = useControls({
  //   colorbg: { value: "#18181E", label: "Background Color" },
  // });

  return (
    <Canvas
      gl={{ antialias: false }}
      shadows
      dpr={[2, 4]}
      camera={{ position: [0, 0.3, 1.2], fov: 25, near: 0.1, far: 35 }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.2, 0); // Set the target position here
      }}
    >
      {/* <Perf position="top-left" /> */}

      <Stage color={"#18181E"} />
      {/* <CameraRig /> */}
      <DraggableElement>
        <BottleIntro />
      </DraggableElement>
    </Canvas>
  );
}

export default Intro;

//working on the intro page
