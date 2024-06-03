import React, { memo, useEffect, useRef, useState, useContext } from "react";
import { Group, ObjectLoader } from "three";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottleEx } from "./Materials/M-BaseBottleExtended";
import Worker from "./dracoWorker?worker";
import { Floor } from "./Materials/Floor";

const Model = memo(
  ({ hoverEffects = {}, refs = {}, meshNames = [], onLoaded, ...props }) => {
    const [model, setModel] = useState(null);
    const workerRef = useRef();

    useEffect(() => {
      workerRef.current = new Worker();
      workerRef.current.onmessage = (event) => {
        const { type, scene, error } = event.data;
        if (type === "load") {
          const loader = new ObjectLoader();
          const loadedScene = loader.parse(scene);
          setModel(loadedScene);
          if (onLoaded) onLoaded();
        } else if (type === "error") {
          console.error("Error loading model:", error);
        }
      };
      workerRef.current.postMessage({ url: "/Kandoblanc-Models03_draco.glb" });

      return () => {
        if (workerRef.current) {
          workerRef.current.terminate();
        }
      };
    }, []);

    if (!model) return null;

    const parts = [
      {
        name: "Top_Proxy",
        geometry: model.getObjectByName("Top_Proxy").geometry,
        position: [0, 0.115, 0],
        rotation: null,
        type: "BaseTransmission",
      },
      {
        name: "Top",
        geometry: model.getObjectByName("Top").geometry,
        position: [0, 0.226794, 0],
        rotation: [0, 0, 0],
        type: "BaseBottleEx",
      },
      {
        name: "Neck_Proxy",
        geometry: model.getObjectByName("Neck_Proxy").geometry,
        position: [0, 0.025, 0],
        rotation: null,
        type: "BaseBottleEx",
      },
      {
        name: "Neck",
        geometry: model.getObjectByName("Neck").geometry,
        position: [0, 0.181, 0],
        rotation: null,
        type: "BaseBottleEx",
      },
      {
        name: "Bottle_Proxy",
        geometry: model.getObjectByName("Bottle_Proxy").geometry,
        position: [0, 0.225, 0],
        rotation: null,
        type: "BaseBottleEx",
      },
      {
        name: "Bottle_Low",
        geometry: model.getObjectByName("Bottle_Low").geometry,
        position: [0, 0.053, 0],
        rotation: null,
        // castShadow: true,
        type: "BaseTransmission",
      },
      {
        name: "Liquid",
        geometry: model.getObjectByName("Liquid").geometry,
        position: [0, 0.053, 0],
        rotation: null,
        type: "Liquid",
      },
      {
        name: "Floor",
        geometry: model.getObjectByName("Floor").geometry,
        position: [0, 0.000076, 0],
        rotation: null,
        type: "Floor",
      },
    ];

    return (
      <group {...props} dispose={null}>
        {parts
          .filter(({ name }) => meshNames.includes(name))
          .map(({ name, geometry, position, rotation, type }) => {
            const MaterialComponent = getMaterialComponent(type);
            const meshRef = refs[name] || null;
            const hoverEffect = hoverEffects[name] || false;

            return (
              <mesh
                key={name}
                ref={meshRef}
                name={name}
                geometry={geometry}
                position={position}
                rotation={rotation || [0, 0, 0]}
              >
                <MaterialComponent isBaseColor={hoverEffect} />
              </mesh>
            );
          })}
      </group>
    );
  }
);

function getMaterialComponent(type) {
  if (type === "BaseTransmission") return BaseTransmission;
  if (type === "Liquid") return Liquid;
  if (type === "Floor") return Floor;

  return BaseBottleEx;
}

export default Model;
