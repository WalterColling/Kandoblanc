import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const useMaterials = (url) => {
  const { nodes, materials } = useGLTF(url);

  useEffect(() => {
    if (materials?.Mat) {
      materials.Mat.needsUpdate = true; // Ensure the material is updated
    }
  }, [materials]);

  return { nodes, materials };
};
