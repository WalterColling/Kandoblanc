import { useRef } from "react";
import { Euler, Quaternion, MathUtils } from "three";

// Function to interpolate between two rotations
export const useSmoothRotation = (initialRotation) => {
  const rotation = useRef(new Euler().copy(initialRotation));
  const targetQuaternion = useRef(
    new Quaternion().setFromEuler(initialRotation)
  );
  const easeFactor = useRef(0);

  const updateRotation = (object, hovered, delta) => {
    if (hovered) {
      rotation.current.y += 0.01;
      easeFactor.current = Math.min(easeFactor.current + delta, 1);
    } else {
      easeFactor.current = Math.max(easeFactor.current - delta, 0);
    }

    targetQuaternion.current.setFromEuler(rotation.current);

    if (object.current) {
      object.current.quaternion.slerp(
        targetQuaternion.current,
        MathUtils.damp(0, 1, 4 * easeFactor.current, delta)
      );
    }
  };

  return updateRotation;
};
