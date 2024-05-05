import React from "react";
import { Perf } from "r3f-perf";
import { Bottle } from "./components/Bottle";
import DraggableElement from "./components/DraggableElement";
import Floor from "./components/Floor";
import SceneEnv from "./components/Environment";

function intro() {
  return (
    <>
      <Perf position="top-left" /> // Performance monitor
      <SceneEnv color="white" />
      <DraggableElement>
        <Bottle />
      </DraggableElement>
    </>
  );
}

export default intro;
