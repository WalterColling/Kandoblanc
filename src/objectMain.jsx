import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import ObjectPage from "./ObjectPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas
    shadows
    dpr={[2, 4]}
    camera={{ position: [0.5, 0.2, 5], fov: 30, near: 0.1, far: 35 }}
  >
    <Suspense fallback={null}>
      <ObjectPage />
    </Suspense>
  </Canvas>
);
