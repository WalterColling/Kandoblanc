import React, { useState } from "react";
import { Bottle } from "./components/Bottle";
import DraggableElement from "./components/DraggableElement";
import SceneEnv from "./components/Environment";
import CameraRig from "./components/CameraRig";
import LoadingContext from "./components/LoadingContext";

function Intro({ samples }) {
  let colorbg = "#18181E";
  let isDraggable = true;

  const [objectLoaded, setObjectLoaded] = useState(false);

  return (
    <>
      <SceneEnv color={colorbg} />
      <LoadingContext.Provider value={{ objectLoaded, setObjectLoaded }}>
        <CameraRig />
        <DraggableElement draggable={isDraggable}>
          <Bottle samples={samples} />
        </DraggableElement>
      </LoadingContext.Provider>
    </>
  );
}

export default Intro;
