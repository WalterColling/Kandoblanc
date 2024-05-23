import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function SceneGraphLogger() {
  const { scene } = useThree();

  useEffect(() => {
    console.log("Scene Graph:", scene);
    const meshInfo = [];
    scene.traverse((object) => {
      if (object.isMesh) {
        const meshData = {
          uuid: object.uuid,
          name: object.name,
          type: object.type,
          geometry: object.geometry.uuid,
          material: Array.isArray(object.material)
            ? object.material.map((mat) => mat.uuid)
            : object.material.uuid,
        };
        meshInfo.push(meshData);
        console.log("Mesh:", object);
        console.log("Geometry:", object.geometry);
        if (Array.isArray(object.material)) {
          object.material.forEach((mat, index) => {
            console.log(`Material[${index}]:`, mat);
          });
        } else {
          console.log("Material:", object.material);
        }
      }
    });
    console.table(meshInfo);
  }, [scene]);

  return null;
}

export default SceneGraphLogger;
