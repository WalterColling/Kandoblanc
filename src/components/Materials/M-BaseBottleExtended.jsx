import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function BaseBottleEx() {
  const baseColor = useTexture("./Kandoblanc_V03_Mat_BaseColor.png");
  const baseColorBW = useTexture("./Kandoblanc_V03_Mat_BaseColor_BW.png");
  const roughness = useTexture("./Kandoblanc_V03_Mat_Roughness.png");
  const metalness = useTexture("./Kandoblanc_V03_Mat_Metallic.png");
  const normalMap = useTexture("./Kandoblanc_V03_Mat_Normal.png");

  // Ensure the textures are in the correct color space
  baseColor.encoding = THREE.sRGBEncoding;
  baseColorBW.encoding = THREE.sRGBEncoding;

  // Flip the UVs of the textures (optional)
  baseColor.flipY = false;
  baseColorBW.flipY = false;
  roughness.flipY = false;
  metalness.flipY = false;
  normalMap.flipY = false;

  const materialRef = useRef();

  // Use blend value for texture blending
  const blendValue = 0;

  return (
    <meshPhysicalMaterial
      ref={materialRef}
      attach="material"
      roughnessMap={roughness}
      metalnessMap={metalness}
      normalMap={normalMap}
      roughness={0.5}
      clearcoat={0.5}
      onBeforeCompile={(shader) => {
        shader.uniforms.baseColorMap = { value: baseColor };
        shader.uniforms.baseColorBWMap = { value: baseColorBW };
        shader.uniforms.blend = { value: blendValue };

        shader.vertexShader = `
          varying vec2 vUv;
          ${shader.vertexShader}
        `;

        shader.vertexShader = shader.vertexShader.replace(
          `#include <uv_vertex>`,
          `
            #include <uv_vertex>
            vUv = uv;
          `
        );

        shader.fragmentShader = `
          uniform sampler2D baseColorMap;
          uniform sampler2D baseColorBWMap;
          uniform float blend;
          varying vec2 vUv;
          ${shader.fragmentShader}
        `;

        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <map_fragment>`,
          `
            vec4 baseColor = texture2D(baseColorMap, vUv);
            vec4 baseColorBW = texture2D(baseColorBWMap, vUv);
            vec4 blendedColor = mix(baseColor, baseColorBW, blend);
            blendedColor = vec4(mix(baseColor.rgb, baseColorBW.rgb, blend), baseColor.a);
            diffuseColor = blendedColor * vec4(diffuse, opacity);
          `
        );

        materialRef.current = shader;
      }}
    />
  );
}
