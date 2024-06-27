import React from "react";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { useDebounce } from "use-debounce";

export function BaseTransmission({ isBaseColor }) {
  const texture01 = useTexture("./Kandoblanc_V03_Mat_BaseColor.webp");
  const texture02 = useTexture("./Kandoblanc_V03_Mat_BaseColor_BW.webp");

  const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value

  const properties = debouncedIsBaseColor
    ? {
        color: "#f9df6c",
        texture: texture01,
        thickness: 0.03,
        anisotropy: 5,

        backside: true,
      }
    : {
        color: "#808080",
        texture: texture02,
        thickness: 0.03,
        anisotropy: 5,
        backside: false,
      };

  return (
    <MeshTransmissionMaterial
      map={properties.texture}
      backside={properties.backside}
      samples={16}
      anisotropy={properties.anisotropy}
      backsideThickness={0.05}
      resolution={32}
      thickness={properties.thickness}
      roughness={0.4}
      envMapIntensity={0}
      color={properties.color}
    />
  );
}
