import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Intro from "./Intro";
import { Perf } from "r3f-perf";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas
    // shadows
    dpr={(0.5, 2)}
    camera={{ position: [0.5, 0.2, 1], fov: 30, near: 0.1, far: 35 }}
  >
    <Perf position="top-left" />

    <Suspense fallback={null}>
      <Intro />
    </Suspense>
  </Canvas>
);
