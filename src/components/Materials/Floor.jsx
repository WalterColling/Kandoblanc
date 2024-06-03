import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, MeshBasicMaterial } from "three";

export const Floor = () => {
  const texture = useLoader(TextureLoader, "./Floor_Shadow03.webp");
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    // opacity: 0.5,
  });

  return <primitive object={material} attach="material" />;
};
