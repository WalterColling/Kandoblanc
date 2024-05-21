import SceneEnv from "./components/Environment";
import { BottleScroll } from "./components/BottleScroll";
import { ScrollControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";

function ObjectPage() {
  let colorbg = "#18181E";

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <SceneEnv color={colorbg} />

      <ScrollControls pages={3} damping={0.3}>
        <CameraRigScroll />
        <BottleScroll />
      </ScrollControls>
    </>
  );
}

export default ObjectPage;
