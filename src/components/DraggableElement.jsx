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
    debounce((value) => setTargetRotation(value), 100),
    []
  );

  const isMobile = useRef(false);
  const isIOS = useRef(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    isMobile.current =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    isIOS.current = /iPhone|iPad|iPod/i.test(userAgent);
    // console.log("isMobile: ", isMobile.current); // Debugging mobile detection
    // console.log("isIOS: ", isIOS.current); // Debugging iOS detection
  }, []);

  const setRotation = (newRot) => {
    if (isMobile.current) {
      setTargetRotation(newRot);
    } else {
      debouncedSetTargetRotation(newRot);
    }
  };

  const bind = useDrag(
    ({ event, movement: [mx], velocity, down }) => {
      if (!draggable) return;

      // console.log("Event type: ", event.type); // Log event type to check for touch
      if (event.type.startsWith("touch")) {
        // console.log("Touch event detected");
      }

      // console.log("Drag event detected: ", { mx, velocity, down }); // Debugging drag event

      const speed = down ? velocity : 0;
      const sensitivity = isMobile.current ? (isIOS.current ? 0.1 : 25) : 1; // Adjust sensitivity for iOS specifically
      let newRot =
        targetRotation +
        (mx / gl.domElement.clientWidth) * 2 * Math.PI * sensitivity;
      newRot =
        targetRotation +
        Math.min(Math.abs(newRot - targetRotation), 2) *
          Math.sign(newRot - targetRotation);

      setRotation(newRot);

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
      setConstantRotation((prev) => prev + 0.001);
      ref.current.rotation.y = rotation.get()[1] + constantRotation;
    }
  }, [rotation, constantRotation, startRotation]);

  return (
    <a.mesh ref={ref} rotation={rotation}>
      {children}
    </a.mesh>
  );
}

export default DraggableElement;
