import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, Object3D } from "three";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
);

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

self.onmessage = async (event) => {
  const { url } = event.data;
  try {
    const gltf = await new Promise((resolve, reject) => {
      gltfLoader.load(url, resolve, undefined, reject);
    });

    const scene = new Group();
    scene.add(gltf.scene);

    // Serialize the scene
    const serializedScene = scene.toJSON();
    self.postMessage({ type: "load", scene: serializedScene });
  } catch (error) {
    self.postMessage({ type: "error", error: error.message });
  }
};
