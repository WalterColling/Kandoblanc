import { create } from "zustand";
import { ObjectLoader } from "three";
import Worker from "./dracoWorker?worker";

const useStore = create((set) => ({
  model: null,
  loadModel: async (onLoaded) => {
    const worker = new Worker();

    worker.onmessage = (event) => {
      const { type, scene, error } = event.data;
      if (type === "load") {
        const loader = new ObjectLoader();
        const loadedScene = loader.parse(scene);
        set({ model: loadedScene });
        if (onLoaded) onLoaded();
      } else if (type === "error") {
        console.error("Error loading model:", error);
      }
    };

    worker.postMessage({ url: "/Kandoblanc-Models04_draco.glb" });

    return () => {
      worker.terminate();
    };
  },
}));

export default useStore;
