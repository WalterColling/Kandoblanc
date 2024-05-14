import { Reflector } from "@react-three/drei";
import { useControls } from "leva";

export default function Floor({ color }) {
  return (
    <>
      <Reflector
        blur={[2048, 2048]}
        resolution={2048}
        args={[20, 20]}
        mirror={0.75}
        mixBlur={5}
        mixStrength={5}
        mixContrast={1}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        depthToBlurRatioBias={0.25}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1.1}
        color={color}
      >
        {(Material, props) => (
          <Material color={color} metalness={0.63} roughness={1} {...props} />
        )}
      </Reflector>
    </>
  );
}
