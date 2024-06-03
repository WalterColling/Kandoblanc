import React from "react";
import { useDebounce } from "use-debounce";

export function Liquid(isBaseColor) {
  const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value
  const color = debouncedIsBaseColor ? "#808080" : "#ff8c00";

  return (
    <meshPhysicalMaterial
      attach="material"
      color={color}
      emissive={color}
      // emissiveIntensity={0.3}
    />
  );
}
