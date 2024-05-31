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

  const clearcoatColor = debouncedIsBaseColor ? "#ea9c3e" : "#808080";
  const color = debouncedIsBaseColor ? "#ff8c00" : "#808080";

  return (
    <MeshTransmissionMaterial
      map={texture}
      backside
      samples={16}
      // backsideThickness={0.2}
      resolution={256}
      thickness={0.3}
      roughness={0.5}
      // anisotropy={1}
      chromaticAberration={0}
      // clearcoat={0.5}
      // clearcoatRoughness={0.5}
      // clearcoatColor={clearcoatColor}
      // envMapIntensity={0}
      color={color}
    />
  );
}

// import React, { useEffect } from "react";
// import { useTexture } from "@react-three/drei";
// import { useDebounce } from "use-debounce";
// import * as THREE from "three";

// export function BaseTransmission({ isBaseColor }) {
//   const texture = useTexture("./Kandoblanc_V03_Mat_BaseColor.webp");

//   useEffect(() => {
//     texture.flipY = false;
//     texture.needsUpdate = true; // Ensure the texture is updated after flipping
//   }, [texture]);

//   const [debouncedIsBaseColor] = useDebounce(isBaseColor, 200); // Debounce value

//   const color = debouncedIsBaseColor ? "#000000" : "#808080"; // Corrected color code from "##000" to "#000000"

//   return (
//     <meshStandardMaterial
//       map={texture}
//       roughness={0.8}
//       metalness={0.2} // Set to 0 for better performance
//       transparent
//       opacity={0.98} // Add a bit of transparency for visual effect
//       color={color}
//       side={THREE.DoubleSide} // Render both sides
//     />
//   );
// }
