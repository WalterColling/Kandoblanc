import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useDebounce } from "use-debounce";

export function BaseBottleEx({ isBaseColor }) {
  const baseColorTexture = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_BaseColor.webp"
  );
  const baseColorBWTexture = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_BaseColor_BW.webp"
  );
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

  useEffect(() => {
    baseColorTexture.flipY = false;
    baseColorBWTexture.flipY = false;
    roughness.flipY = false;
    metalness.flipY = false;
    normalMap.flipY = false;
  }, [baseColorTexture, baseColorBWTexture, roughness, metalness, normalMap]);

  const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value

  const [texture, setTexture] = useState(baseColorTexture);

  useEffect(() => {
    setTexture(debouncedIsBaseColor ? baseColorTexture : baseColorBWTexture);
  }, [debouncedIsBaseColor, baseColorTexture, baseColorBWTexture]);

  return (
    <meshPhysicalMaterial
      attach="material"
      map={texture}
      // roughnessMap={roughness}
      // metalnessMap={metalness}
      // normalMap={normalMap}
      roughness={0.1}
      // clearcoat={0.5}
    />
  );
}
