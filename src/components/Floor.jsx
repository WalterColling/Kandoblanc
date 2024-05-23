import React from "react";
import { Plane, MeshReflectorMaterial } from "@react-three/drei";

export default function Floor({ color }) {
  return (
    <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <MeshReflectorMaterial
        attach="material"
        color={color}
        resolution={1024}
        mirror={0.75}
        mixBlur={5}
        mixStrength={5}
        mixContrast={1}
        depthToBlurRatioBias={0.25}
        depthScale={0.5}
        minDepthThreshold={0.5}
        maxDepthThreshold={1.1}
        metalness={0.63}
        roughness={1}
      />
    </Plane>
  );
}
