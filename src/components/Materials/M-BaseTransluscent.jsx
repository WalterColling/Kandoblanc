import React from "react";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";

export function BaseTransmission() {
  const texture = useTexture("./Kandoblanc_V03_Mat_BaseColor.png");

  return (
    <MeshTransmissionMaterial
      map={texture}
      backside
      samples={16}
      backsideThickness={0.3}
      resolution={1024}
      thickness={0.07}
      roughness={0.5}
      // anisotropy={1}
      chromaticAberration={0}
      // clearcoat={0.5}
      // clearcoatRoughness={0.5}
      envMapIntensity={0}
    />
  );
}
