import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import LoadingContext from "./LoadingContext";
import * as THREE from "three";
import { useContext, useMemo, useEffect, useState } from "react";
import throttle from "lodash.throttle";

function CameraRig() {
  const { camera } = useThree();
  const { objectLoaded } = useContext(LoadingContext);
  const [isMobile, setIsMobile] = useState(false);
  const target = useMemo(() => new THREE.Vector3(0, 0.2, 0), []);
  const cameraPosition = useMemo(() => new THREE.Vector3(0, 0.1, 1.5), []); // Initial camera position

  // Detect if the user is on a mobile device
  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      )
    );
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      target.y += target.y * -0.13; // Move the target up in the Y position
    }
  }, [isMobile, target]);

  // Define the throttled function
  const updateCameraPosition = useMemo(
    () =>
      throttle((pointer, viewport) => {
        const x = pointer.x * (viewport.width / 2);
        const y = (2 + pointer.y) / 5;
        const z = 1.2;
        cameraPosition.set(x, y, z);
      }, 400), // Adjust the throttle delay as needed
    [cameraPosition]
  );

  useFrame((state, delta) => {
    if (objectLoaded) {
      // Update camera position only if the pointer has moved
      if (state.pointer.x !== 0 || state.pointer.y !== 0) {
        updateCameraPosition(state.pointer, state.viewport);
      }
      easing.damp3(camera.position, cameraPosition, 0.8, delta);
      camera.lookAt(target);
    }
  });

  return null;
}

export default CameraRig;
