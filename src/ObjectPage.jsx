import { useControls } from "leva";
import Stage from "./components/Stage";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import CameraRigScroll from "./components/CameraRigScroll";
import BottleScrollHTML from "./components/BottleScrollHTML";
import BottleScroll from "./components/BottleScroll";

function ObjectPage() {
  let colorbg = "#18181E";

  // Define leva controls for pages and damping // remove for final project
  const { pages, damping } = useControls({
    pages: { value: 6, min: 1, max: 20, step: 0.1 },
    damping: { value: 0.3, min: 0, max: 1, step: 0.01 },
  });

  return (
    <>
      <Stage color={colorbg} />
      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        target={[0, 0.17, 0]}
      />
      <ScrollControls pages={pages} damping={damping}>
        <Scroll html>
          <BottleScrollHTML />
        </Scroll>
        <BottleScroll />
        <CameraRigScroll />
      </ScrollControls>
    </>
  );
}

export default ObjectPage;
