import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Intro from "./Intro";
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
      camera={{ position: [0.5, 0.2, 1], fov: 30, near: 0.1, far: 35 }}
      performance={{ min: 1 }}
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
        onIncline={() => {
          setDpr(4);
          setSamples(256);
        }}
        onDecline={() => {
          setDpr(1);
          setSamples(8);
        }}
        onChange={({ factor }) => {
          handleDprChange(factor);
        }}
        onFallback={() => {
          setDpr(2);
          setSamples(128);
        }}
      >
        <Suspense fallback={null}>
          <Intro />
        </Suspense>

        <AdaptivePixelRatio />
      </PerformanceMonitor>
    </Canvas>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
