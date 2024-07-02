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
          files={"/studio_Kandoblanc_1k.hdr"}
          background={false}
          environmentRotation={[0, Math.PI / 2, 0]}
        />
      </group>
      <ambientLight intensity={2} />
    </>
  );
}

export default Stage;
