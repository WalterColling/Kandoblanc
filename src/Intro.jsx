import React from "react";
import { Perf } from "r3f-perf";
import { Bottle } from "./components/Bottle";
import DraggableElement from "./components/DraggableElement";
import Floor from "./components/Floor";
import SceneEnv from "./components/Environment";
import { useControls } from "leva";

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
      <Perf position="top-left" /> // Performance monitor
      <SceneEnv color={colorbg} />
      <DraggableElement draggable={isDraggable}>
        <Bottle />
      </DraggableElement>
    </>
  );
}

export default intro;
