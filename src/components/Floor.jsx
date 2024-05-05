import { Reflector } from "@react-three/drei";

export default function Floor({ color }) {
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material color={color} metalness={0.4} {...props} />
      )}
    </Reflector>
  );
}
