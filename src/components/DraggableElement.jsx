import { useRef, useState, useCallback, useEffect } from "react";
import { useSpring, a } from "@react-spring/three";
import { useDrag } from "react-use-gesture";
import { useThree, useFrame } from "@react-three/fiber";
import { easings } from "@react-spring/web";
import debounce from "lodash.debounce";

function DraggableElement({ children, draggable = true }) {
  const ref = useRef(null);
  const { gl } = useThree();
  const [targetRotation, setTargetRotation] = useState(0);
  const [{ rotation }, api] = useSpring(() => ({ rotation: [0, 0, 0] }));
  const [constantRotation, setConstantRotation] = useState(0);
  const [startRotation, setStartRotation] = useState(false);

  const debouncedSetTargetRotation = useCallback(
    debounce(setTargetRotation, 0.1),
    []
  );

  const isMobile = useRef(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    isMobile.current =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
  }, []);

  const bind = useDrag(
    ({ movement: [mx], velocity, down }) => {
      if (!draggable) return;

      const speed = down ? velocity : 0;
      const sensitivity = isMobile.current ? 50 : 1; // Increase sensitivity for mobile
      let newRot =
        targetRotation +
        (mx / gl.domElement.clientWidth) * 2 * Math.PI * sensitivity;
      newRot =
        targetRotation +
        Math.min(Math.abs(newRot - targetRotation), 0.1) *
          Math.sign(newRot - targetRotation);

      debouncedSetTargetRotation(newRot);

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
      eventOptions: { passive: false },
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRotation(true);
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (ref.current && startRotation) {
      setConstantRotation((prev) => prev + 0.002);
      ref.current.rotation.y = rotation.get()[1] + constantRotation;
    }
  }, [rotation, constantRotation, startRotation]);

  return (
    <a.mesh ref={ref} rotation={rotation} {...bind}>
      {children}
    </a.mesh>
  );
}

export default DraggableElement;
