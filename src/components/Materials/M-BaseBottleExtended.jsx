import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useDebounce } from "use-debounce";

export function BaseBottleEx({ isBaseColor }) {
  const baseColorTexture = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_BaseColor.jpg"
  );
  const baseColorBWTexture = useLoader(
    TextureLoader,
    "./Kandoblanc_V03_Mat_BaseColor_BW.webp"
  );

  const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value
  const [texture, setTexture] = useState(baseColorBWTexture);

  useEffect(() => {
    setTexture(debouncedIsBaseColor ? baseColorTexture : baseColorBWTexture);
  }, [debouncedIsBaseColor, baseColorTexture, baseColorBWTexture]);

  return (
    <meshPhysicalMaterial attach="material" map={texture} roughness={0.1} />
  );
}
