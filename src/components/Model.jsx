import React, { memo, useEffect } from "react";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottleEx } from "./Materials/M-BaseBottleExtended";
import { Floor } from "./Materials/Floor";
import { Proxy } from "./Materials/Proxy";
import useStore from "./useStore";

const Model = memo(
  ({
    hoverEffects = {},
    refs = {},
    meshNames = [],
    onPointerOverHandlers = {},
    onPointerOutHandlers = {},
    onLoaded,
    ...props
  }) => {
    const model = useStore((state) => state.model);
    const loadModel = useStore((state) => state.loadModel);

    useEffect(() => {
      loadModel(onLoaded);
    }, [loadModel, onLoaded]);

    if (!model) return null;

    const parts = [
      {
        key: "Top_Proxy",
        geometry: model.getObjectByName("Top_Proxy").geometry,
        position: [0, 0.115, 0],
        rotation: null,
        type: "Proxy",
      },
      {
        key: "Top",
        geometry: model.getObjectByName("Top").geometry,
        position: [0, 0.226794, 0],
        rotation: [0, 0, 0],
        type: "BaseBottleEx",
      },
      {
        key: "Neck_Proxy",
        geometry: model.getObjectByName("Neck_Proxy").geometry,
        position: [0, 0.025, 0],
        rotation: null,
        type: "Proxy",
      },
      {
        key: "Neck",
        geometry: model.getObjectByName("Neck").geometry,
        position: [0, 0.181, 0],
        rotation: null,
        type: "BaseBottleEx",
      },
      {
        key: "Bottle_Proxy",
        geometry: model.getObjectByName("Bottle_Proxy").geometry,
        position: [0, 0.225, 0],
        rotation: null,
        type: "Proxy",
      },
      {
        key: "Bottle_Low",
        geometry: model.getObjectByName("Bottle_Low").geometry,
        position: [0, 0.053, 0],
        rotation: null,
        type: "BaseTransmission",
      },
      {
        key: "Liquid",
        geometry: model.getObjectByName("Liquid").geometry,
        position: [0, 0.053, 0],
        rotation: null,
        type: "Liquid",
      },
      {
        key: "Floor",
        geometry: model.getObjectByName("Floor").geometry,
        position: [0, 0.000076, 0],
        rotation: null,
        type: "Floor",
      },
    ];

    return (
      <group {...props} dispose={null}>
        {parts
          .filter(({ key }) => meshNames.includes(key))
          .map(({ key, geometry, position, rotation, type }) => {
            const MaterialComponent = getMaterialComponent(type);
            const meshRef = refs[key] || null;
            const hoverEffect = hoverEffects[key] || false;
            const onPointerOver = onPointerOverHandlers[key] || null;
            const onPointerOut = onPointerOutHandlers[key] || null;
            const isProxy = type === "Proxy";

            return (
              <mesh
                key={key}
                ref={meshRef}
                name={name}
                geometry={geometry}
                position={position}
                rotation={rotation || [0, 0, 0]}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                visible={!isProxy} // Set visibility to false for proxy meshes
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
  if (type === "Proxy") return Proxy;

  return BaseBottleEx;
}

export default Model;
