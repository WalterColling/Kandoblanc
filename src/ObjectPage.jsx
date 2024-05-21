import SceneEnv from "./components/Environment";
import { BottleScroll } from "./components/BottleScroll";
import { ScrollControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";
import { CameraWork } from "./components/CameraWork";

function ObjectPage() {
  let colorbg = "#18181E";

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <SceneEnv color={colorbg} />

      <ScrollControls pages={7} damping={0.3}>
        <BottleScroll />
        <CameraRigScroll />
      </ScrollControls>
    </>
  );
}

export default ObjectPage;
