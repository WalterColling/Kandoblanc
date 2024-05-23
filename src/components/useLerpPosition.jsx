import { useRef } from "react";
import { Vector3 } from "three";

export const useLerpPosition = (positions) => {
  const targetPosition = useRef(new Vector3());

  const updatePosition = (object, offset) => {
    const currentIndex = Math.floor(offset);
    const nextIndex = Math.min(currentIndex + 1, positions.length - 1);
    const progress = offset - currentIndex;
    const currentPos = positions[currentIndex];
    const nextPos = positions[nextIndex];

    targetPosition.current.lerpVectors(
      new Vector3(...currentPos),
      new Vector3(...nextPos),
      progress
    );

    if (object.current) {
      object.current.position.copy(targetPosition.current);
    }
  };

  return updatePosition;
};
