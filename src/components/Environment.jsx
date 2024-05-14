import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";
import Floor from "./Floor";
import {
  Environment,
  useHelper,
  Reflector,
  ContactShadows,
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";

function SceneEnv({ color }) {
  const directionLight = useRef();
  useHelper(directionLight, THREE.DirectionalLightHelper, 0.5);

  const { camera } = useThree();
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -camera.rotation.x;
      groupRef.current.rotation.y = -camera.rotation.y;
      groupRef.current.rotation.z = -camera.rotation.z;
    }
  });

  return (
    <>
      <fog attach="fog" args={[color, 0.5, 3]} />
      <color attach="background" args={[color]} />

      <group ref={groupRef}>
        <Environment
          preset="studio"
          background={false}
          environmentRotation={[0, Math.PI / 2.1, 0]}
        />
      </group>
      <ambientLight intensity={0.5} />

      <ContactShadows
        resolution={1024}
        frames={1}
        scale={1}
        blur={2}
        opacity={1}
      />
      <Floor color={color} />
    </>
  );
}

export default SceneEnv;

// import React, { useRef } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import { Color, TextureLoader, CubeTextureLoader, RGBFormat, LinearMipmapLinearFilter } from "three";
// import Floor from "./Floor";
// import {
//   useHelper,
//   Reflector,
//   ContactShadows,
// } from "@react-three/drei";
// import { useControls } from "leva";
// import * as THREE from "three";

// function SceneEnv({ color }) {
//   const directionLight = useRef();
//   useHelper(directionLight, THREE.DirectionalLightHelper, 0.5);

//   const { camera, scene } = useThree();
//   const groupRef = useRef();

//   // Load the environment map
//   const loader = new CubeTextureLoader();
//   const texture = loader.load([
//     'px.png',
//     'nx.png',
//     'py.png',
//     'ny.png',
//     'pz.png',
//     'nz.png',
//   ]);

//   scene.background = texture;

//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.x = -camera.rotation.x;
//       groupRef.current.rotation.y = -camera.rotation.y;
//       groupRef.current.rotation.z = -camera.rotation.z;
//     }
//   });

//   return (
//     <>
//       <fog attach="fog" args={[color, 1, 6]} />
//       <color attach="background" args={[color]} />

//       <group ref={groupRef}>
//         {/* Your 3D objects go here */}
//       </group>
//       <ambientLight intensity={0.5} />

//       <ContactShadows
//         resolution={1024}
//         frames={1}
//         scale={1}
//         blur={2}
//         opacity={1}
//       />
//       <Floor color={color} />
//     </>
//   );
// }

// export default SceneEnv;
