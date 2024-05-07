import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Intro from "./Intro";
import CameraRig from "./components/CameraRig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Canvas
      shadows
      dpr={[2, 4]}
      camera={{ position: [1, 0, 1], fov: 40, near: 0.1, far: 20 }}
    >
      <Suspense>
        <Intro />
      </Suspense>

      {/* <OrbitControls /> */}
      <CameraRig />
    </Canvas>
  </>
);
