import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function ConstantRotation({ children }) {
  const ref = useRef(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001; // Increment rotation
    }
  });

  return <mesh ref={ref}>{children}</mesh>;
}

export default ConstantRotation;
