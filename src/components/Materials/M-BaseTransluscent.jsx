import React from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";

export function BaseTransmission() {
  return (
    <MeshTransmissionMaterial
      backside
      samples={8}
      resolution={512}
      thickness={0.3}
      roughness={0.2}
      anisotropy={1}
      chromaticAberration={0.2}
    />
  );
}
