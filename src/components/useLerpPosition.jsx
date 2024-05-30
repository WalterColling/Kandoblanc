import { useRef } from "react";
import { Vector3 } from "three";

// Function to interpolate between two positions
export const useLerpPosition = (positions) => {
  const targetPosition = useRef(new Vector3());
  const currentPosVector = useRef(new Vector3());
  const nextPosVector = useRef(new Vector3());

  const updatePosition = (object, offset) => {
    if (positions.length === 0) {
      console.error("Positions array is empty");
      return;
    }

    // Clamp offset to ensure it stays within valid range
    offset = Math.max(0, Math.min(offset, positions.length - 1));

    const currentIndex = Math.floor(offset);
    const nextIndex = Math.min(currentIndex + 1, positions.length - 1);
    const progress = offset - currentIndex;

    currentPosVector.current.set(...positions[currentIndex]);
    nextPosVector.current.set(...positions[nextIndex]);

    targetPosition.current.lerpVectors(
      currentPosVector.current,
      nextPosVector.current,
      progress
    );

    if (object.current) {
      object.current.position.copy(targetPosition.current);
    }
  };

  return updatePosition;
};
