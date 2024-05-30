import React, { Suspense, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import ObjectPage from "./ObjectPage";
import { Perf } from "r3f-perf";
import { PerformanceMonitor } from "@react-three/drei";
import round from "lodash/round";
import { AdaptivePixelRatio } from "./components/AdaptativePixelRatio";

const App = () => {
  const [dpr, setDpr] = useState(2); // Initial dpr value

  const handleDprChange = (factor) => {
    const newDpr = round(1 + 3 * factor, 1); // Adjust to range 1 to 4
    setDpr(Math.max(1, Math.min(4, newDpr))); // Ensure within bounds
  };

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0.5, 0.2, 5], fov: 30, near: 0.1, far: 35 }}
      performance={{ min: 0.5 }}
    >
      <Perf position="top-left" />

      <PerformanceMonitor
        ms={500} // Collect average FPS every 500 milliseconds
        iterations={30} // Increase iterations to reduce sensitivity
        threshold={0.75}
        bounds={(refreshrate) => (refreshrate > 90 ? [45, 60] : [15, 30])}
        flipflops={3}
        factor={0.5}
        step={0.1}
        onIncline={() => setDpr(6)}
        onDecline={() => setDpr(1)}
        onChange={({ factor }) => handleDprChange(factor)}
        onFallback={() => setDpr(2)}
      >
        <Suspense fallback={null}>
          <ObjectPage />
        </Suspense>
        <AdaptivePixelRatio />
      </PerformanceMonitor>
    </Canvas>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
