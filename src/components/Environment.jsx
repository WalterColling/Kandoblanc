import React, { useRef, useMemo } from "react";
import { Environment, Plane, MeshReflectorMaterial } from "@react-three/drei";

function SceneEnv({ color }) {
  const groupRef = useRef();
  const fogArgs = useMemo(() => [color, 0.5, 3], [color]);
  const backgroundColor = useMemo(() => [color], [color]);

  const planeArgs = useMemo(() => [20, 20], []);
  const rotationArgs = useMemo(() => [-Math.PI / 2, 0, 0], []);
  const positionArgs = useMemo(() => [0, 0, 0], []);

  return (
    <>
      <fog attach="fog" args={fogArgs} />
      <color attach="background" args={backgroundColor} />

      <group ref={groupRef}>
        <Environment
          preset="studio"
          background={false}
          environmentRotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <ambientLight intensity={2} />

      <Plane args={planeArgs} rotation={rotationArgs} position={positionArgs}>
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
    </>
  );
}

export default SceneEnv;
