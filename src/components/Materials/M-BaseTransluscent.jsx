import React from "react";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";

export function BaseTransmission() {
  const texture = useTexture("./Kandoblanc_V03_Mat_BaseColor.png");

  texture.flipY = false;

  return (
    <MeshTransmissionMaterial
      map={texture}
      backside
      samples={16}
      backsideThickness={0.01}
      resolution={512}
      thickness={0.07}
      roughness={0.7}
      anisotropy={1}
      chromaticAberration={0}
      clearcoat={0.5}
      clearcoatRoughness={0.5}
      clearcoatColor={"#8a2f05"}
      envMapIntensity={0}
      color={"#f8eeb5"}
    />
  );
}
