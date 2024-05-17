import React from "react";
import { useTexture } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

export function BaseBottle() {
  const baseColor = useTexture("./Kandoblanc_V03_Mat_BaseColor_BW.webp");
  const roughness = useTexture("./Kandoblanc_V03_Mat_Roughness.webp");
  const metalness = useTexture("./Kandoblanc_V03_Mat_Metallic.webp");
  const normalMap = useTexture("./Kandoblanc_V03_Mat_Normal.webp");

  // Flip the UVs of the textures
  baseColor.flipY = false;
  roughness.flipY = false;
  metalness.flipY = false;
  normalMap.flipY = false;

  const roughnessFactor = 0.5; // Adjust the roughness factor as desired

  return (
    <meshPhysicalMaterial
      attach="material"
      map={baseColor}
      roughnessMap={roughness}
      metalnessMap={metalness}
      normalMap={normalMap}
      roughness={roughnessFactor}
      Clearcoat={0.5}
    />
  );
}
