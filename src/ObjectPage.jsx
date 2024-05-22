import { useControls } from "leva";
import SceneEnv from "./components/Environment";
import { BottleScroll } from "./components/BottleScroll";
import { ScrollControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";
import { CameraWork } from "./components/CameraWork";

function ObjectPage() {
  let colorbg = "#18181E";

  // Define leva controls for pages and damping
  const { pages, damping } = useControls({
    pages: { value: 7, min: 1, max: 20, step: 1 },
    damping: { value: 0.3, min: 0, max: 1, step: 0.01 },
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <SceneEnv color={colorbg} />

      <ScrollControls pages={pages} damping={damping}>
        <BottleScroll />
        <CameraRigScroll />
      </ScrollControls>
    </>
  );
}

export default ObjectPage;
