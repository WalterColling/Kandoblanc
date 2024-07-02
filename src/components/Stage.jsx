import React, { useRef, useMemo } from "react";
import { Environment } from "@react-three/drei";

function Stage({ color }) {
  const groupRef = useRef();

  const backgroundColor = useMemo(() => [color], [color]);

  return (
    <>
      <color attach="background" args={backgroundColor} />

      <group ref={groupRef}>
        <Environment
          files={"/HDRI_Kandoblanc_V04.hdr"}
          background={false}
          environmentRotation={[0, Math.PI / 2, 0]}
          intensity={20}
        />
      </group>
      <ambientLight intensity={2} />
    </>
  );
}

export default Stage;
