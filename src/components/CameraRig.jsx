import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    //  mouse movement with smoothing
    const x = state.pointer.x * (state.viewport.width / 10); // sensitivity
    const y = (1.4 + state.pointer.y) / 5; // sensitivity
    const z = 1; // keep the camera's distance constant at 1

    easing.damp3(camera.position, [x, y, z], 0.8, delta);

    camera.lookAt(0, 0.05, 0);
  });
}

export default CameraRig;
