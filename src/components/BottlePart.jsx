import React, { forwardRef } from "react";
import { BaseTransmission } from "./Materials/M-BaseTransluscent";
import { Liquid } from "./Materials/M-Liquid";
import { BaseBottleEx } from "./Materials/M-BaseBottleExtended";

// Component to create the bottle parts and apply the materials

const BottlePart = forwardRef(
  ({ name, geometry, position, rotation, type, hoverEffect }, ref) => {
    const MaterialComponent =
      type === "BaseTransmission"
        ? BaseTransmission
        : type === "Liquid"
          ? Liquid
          : BaseBottleEx;

    return (
      <mesh
        ref={ref}
        name={name}
        geometry={geometry}
        position={position}
        rotation={rotation}
      >
        <MaterialComponent isBaseColor={hoverEffect} />
      </mesh>
    );
  }
);

export default BottlePart;
