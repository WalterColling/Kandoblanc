import React from "react";
import { Perf } from "r3f-perf";
import { Bottle } from "./components/Bottle";
import DraggableElement from "./components/DraggableElement";
import Floor from "./components/Floor";
import SceneEnv from "./components/Environment";
import { useControls } from "leva";

function intro() {
  const { color, isDraggable } = useControls({
    color: true,
    isDraggable: true,
  });
  let colorbg = "#18181E";
  if (color === false) {
    colorbg = "#FAFAF6";
  } else {
    colorbg = "#18181E";
  }

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
