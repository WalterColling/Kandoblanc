import { useState, useRef, useEffect } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { gsap } from "gsap";

function GlassEffect() {
  const meshRef = useRef();
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(false);
  };

  useEffect(() => {
    if (!active && meshRef.current) {
      gsap.to(meshRef.current.material, { anisotropicBlur: 0, duration: 1 });
    }
  }, [active]);

  return (
    <mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0.4]}>
      <circleGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        samples={32}
        resolution={1024}
        anisotropicBlur={active ? 0.1 : 0}
        thickness={0.05}
        roughness={0.5}
        toneMapped={true}
      />
    </mesh>
  );
}

export default GlassEffect;
