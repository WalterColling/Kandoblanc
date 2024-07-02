import { create } from "zustand";
import { ObjectLoader, Group } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
);

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const useStore = create((set) => ({
  model: null,
  textures: {},
  loadModel: async (onLoaded) => {
    try {
      console.log("Loading model...");
      const gltf = await new Promise((resolve, reject) => {
        gltfLoader.load(
          "/Kandoblanc-Models04_draco.glb",
          resolve,
          undefined,
          reject
        );
      });

      const scene = new Group();
      scene.add(gltf.scene);

      // Directly set the loaded scene in the Zustand store
      set({ model: scene });

      if (onLoaded) onLoaded();
      // console.log("Model loaded successfully.");
    } catch (error) {
      console.error("Error loading model:", error);
    }
  },
}));

export default useStore;
