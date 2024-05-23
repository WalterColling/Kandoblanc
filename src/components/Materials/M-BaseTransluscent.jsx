import React, { useEffect } from "react";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";

export function BaseTransmission({ isBaseColor }) {
  const texture = useTexture("./Kandoblanc_V03_Mat_BaseColor.webp");

  useEffect(() => {
    texture.flipY = false;
    texture.needsUpdate = true; // Ensure the texture is updated after flipping
  }, [texture]);

  const clearcoatColor = isBaseColor ? "#8a2f05" : "#808080";
  const color = isBaseColor ? "#f8eeb5" : "#808080";

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
      clearcoatColor={clearcoatColor}
      envMapIntensity={0}
      color={color}
    />
  );
}
