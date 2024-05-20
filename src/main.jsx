import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Intro from "./Intro";
import CameraRig from "./components/CameraRig";
import { OrbitControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";
import { CameraWithHelperComponent } from "./components/CameraWork";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Canvas
      shadows
      dpr={[2, 4]}
      camera={{ position: [0.5, 0.2, 5], fov: 30, near: 0.1, far: 35 }}
    >
      <Suspense fallback={null}>
        <Intro />
      </Suspense>
      {/* <EffectComposer>
        {" "}
        <DepthOfField
          focusDistance={0.5} // where to focus
          focalLength={0.02} // focal length
          bokehScale={2} // bokeh size
        />
      </EffectComposer> */}

      {/* <OrbitControls /> */}

      {/* <CameraRig /> */}

      {/* <CameraWithHelperComponent /> */}
    </Canvas>
  </>
);
