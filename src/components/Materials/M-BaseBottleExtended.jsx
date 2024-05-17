import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshPhysicalMaterial } from "three";

export function BaseBottleEx({ isBaseColor }) {
  const [baseColor, baseColorBW] = useLoader(TextureLoader, [
    "./Kandoblanc_V03_Mat_BaseColor.webp",
    "./Kandoblanc_V03_Mat_BaseColor_BW.webp",
  ]);
  const roughness = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_Roughness.webp"
  );
  const metalness = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_Metallic.webp"
  );
  const normalMap = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_Normal.webp"
  );

  // Flip the UVs of the textures
  baseColor.flipY = false;
  baseColorBW.flipY = false;
  roughness.flipY = false;
  metalness.flipY = false;
  normalMap.flipY = false;

  const [texture, setTexture] = useState(baseColor);

  useEffect(() => {
    setTexture(isBaseColor ? baseColor : baseColorBW);
  }, [isBaseColor, baseColor, baseColorBW]);

  const roughnessFactor = 0.5; // Adjust the roughness factor as desired

  return (
    <meshPhysicalMaterial
      attach="material"
      map={texture}
      roughnessMap={roughness}
      metalnessMap={metalness}
      normalMap={normalMap}
      roughness={roughnessFactor}
      clearcoat={0.5}
    />
  );
}
