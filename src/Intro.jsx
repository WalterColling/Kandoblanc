import React, { useState } from "react";
import { Perf } from "r3f-perf";
import { Bottle } from "./components/Bottle";
import DraggableElement from "./components/DraggableElement";
import Floor from "./components/Floor";
import SceneEnv from "./components/Environment";
import { useControls } from "leva";
import { BottleScroll } from "./components/BottleScroll";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";
import CameraRig from "./components/CameraRig";

function intro() {
  let colorbg = "#18181E";
  let isDraggable = true;

  // // color and isDraggable are the controls for the Leva GUI
  // const { color, isDraggable } = useControls({
  //   color: true,
  //   isDraggable: true,
  // });
  // if (color === false) {
  //   colorbg = "#FAFAF6";
  // } else {
  //   colorbg = "#18181E";
  // }

  return (
    <>
      <Perf position="top-left" />
      <SceneEnv color={colorbg} />

      <DraggableElement draggable={isDraggable}>
        <CameraRig />
        <Bottle />
      </DraggableElement>
      {/* <ScrollControls pages={3} damping={0.3}>
        <CameraRigScroll />
        <BottleScroll />
      </ScrollControls> */}
    </>
  );
}

export default intro;
