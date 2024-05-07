import { Reflector } from "@react-three/drei";
import { useControls } from "leva";

export default function Floor({ color }) {
  const { ShowReflection } = useControls({ ShowReflection: false });

  return (
    <>
      {ShowReflection && (
        <Reflector
          blur={[256, 256]}
          resolution={2048}
          args={[20, 20]}
          mirror={0.5}
          mixBlur={2}
          mixStrength={1.5}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          {(Material, props) => (
            <Material
              color={color}
              metalness={0.2}
              roughness={0.2}
              {...props}
            />
          )}
        </Reflector>
      )}
    </>
  );
}
