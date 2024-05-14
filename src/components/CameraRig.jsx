import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Adjust the camera based on mouse movement with smoothing
    const x = state.pointer.x * (state.viewport.width / 18); // sensitivity adjusted
    const y = (1.5 + state.pointer.y) / 5; // sensitivity adjusted
    const z = 1; // keep the camera's distance constant at 1

    easing.damp3(camera.position, [x, y, z], 0.8, delta);

    camera.lookAt(0, 0.05, 0);
  });
}

export default CameraRig;
//alternative camera control
// function Intro() {
//   const [vec] = useState(() => new THREE.Vector3())
//   return useFrame((state) => {
//     state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
//     state.camera.lookAt(0, 0, 0)
//   })
// }
