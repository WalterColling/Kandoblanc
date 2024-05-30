import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import LoadingContext from "./LoadingContext";
import * as THREE from "three";
import { useContext, useMemo, useEffect } from "react";
import { gsap } from "gsap";
import throttle from "lodash.throttle";

function CameraRig() {
  const { camera } = useThree();
  const { objectLoaded } = useContext(LoadingContext);
  const target = useMemo(() => new THREE.Vector3(0, 0.2, 0), []);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);

  // Define the throttled function
  const updateCameraPosition = useMemo(
    () =>
      throttle((pointer, viewport) => {
        const x = pointer.x * (viewport.width / 2);
        const y = (1.2 + pointer.y) / 5;
        const z = 0.8;
        cameraPosition.set(x, y, z);
      }, 400), // Adjust the throttle delay as needed
    [cameraPosition]
  );

  // Set up an interval to trigger the animation every 5 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      gsap.to(target, { y: 0.12, duration: 1 });
    }, 5000); // 5 seconds

    return () => clearTimeout(interval); // Clean up the interval on component unmount
  }, [target]);

  useFrame((state, delta) => {
    if (objectLoaded) {
      updateCameraPosition(state.pointer, state.viewport);
      easing.damp3(camera.position, cameraPosition, 0.8, delta);
      camera.lookAt(target);
    }
  });

  return null;
}

export default CameraRig;
