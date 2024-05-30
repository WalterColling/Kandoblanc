import React, { useEffect } from "react";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { useDebounce } from "use-debounce";

export function BaseTransmission({ isBaseColor }) {
  const texture = useTexture("./Kandoblanc_V03_Mat_BaseColor.webp");

  useEffect(() => {
    texture.flipY = false;
    texture.needsUpdate = true; // Ensure the texture is updated after flipping
  }, [texture]);

  const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value

  const clearcoatColor = debouncedIsBaseColor ? "#8a2f05" : "#808080";
  const color = debouncedIsBaseColor ? "#f8eeb5" : "#808080";

  return (
    <MeshTransmissionMaterial
      map={texture}
      backside
      samples={16}
      backsideThickness={0.01}
      resolution={256}
      thickness={0.07}
      roughness={0.6}
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
