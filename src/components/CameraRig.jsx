import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import LoadingContext from "./LoadingContext";
import * as THREE from "three";
import { useContext, useState, useEffect } from "react";
import { gsap } from "gsap";

function CameraRig() {
  const { camera } = useThree();
  const { objectLoaded } = useContext(LoadingContext);
  const [target, setTarget] = useState(new THREE.Vector3(0, 0.2, 0));

  // Change the target when there is a click
  useEffect(() => {
    const handleClick = () => {
      gsap.to(target, { y: 0.12, duration: 1 });
    };

    window.addEventListener("click", handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useFrame((state, delta) => {
    //  mouse movement with smoothing
    if (objectLoaded) {
      const x = state.pointer.x * (state.viewport.width / 10); // sensitivity
      const y = (1.2 + state.pointer.y) / 5; // sensitivity
      const z = 0.8; // keep the camera's distance constant at 1

      easing.damp3(camera.position, [x, y, z], 0.8, delta);

      camera.lookAt(target);
    }
  });
}

export default CameraRig;
