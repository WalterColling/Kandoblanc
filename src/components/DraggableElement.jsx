import { useRef, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import { useDrag } from "react-use-gesture";
import { useThree, useFrame } from "@react-three/fiber";
import { easings } from "@react-spring/web";

function DraggableCube({ children }) {
  const ref = useRef(null);
  const { gl } = useThree();
  const [targetRotation, setTargetRotation] = useState(0);
  const [{ rotation }, api] = useSpring(() => ({ rotation: [0, 0, 0] }));

  useDrag(
    ({ movement: [mx], velocity, down }) => {
      const speed = down ? velocity : 0;
      // Calculate rotation based on proportion of mouse movement to tab width
      let newRot =
        targetRotation + (mx / gl.domElement.clientWidth) * 2 * Math.PI;
      // Limit the amount of rotation added per interaction to 0.1 radians
      newRot =
        targetRotation +
        Math.min(Math.abs(newRot - targetRotation), 0.1) *
          Math.sign(newRot - targetRotation);
      setTargetRotation(newRot);
      api.start({
        rotation: [0, newRot, 0],
        config: {
          mass: 1,
          tension: 200 + speed * 50,
          friction: 100,
          easing: easings.easeCubic,
        },
      });
    },
    {
      domTarget: gl.domElement,
    }
  );

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotation.get()[1];
    }
  });

  return (
    <a.mesh ref={ref} rotation={rotation}>
      {children}
    </a.mesh>
  );
}

export default DraggableCube;
