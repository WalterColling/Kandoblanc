import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Intro from "./Intro";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas
    shadows
    dpr={(0.5, 2)}
    camera={{ position: [0.5, 0.2, 1], fov: 30, near: 0.1, far: 35 }}
  >
    <Suspense fallback={null}>
      <Intro />
    </Suspense>
  </Canvas>
);
