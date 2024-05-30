import { useRef } from "react";
import { Euler, Quaternion, MathUtils } from "three";

// Function to interpolate between two rotations
export const useSmoothRotation = (initialRotation) => {
  const rotation = useRef(new Euler().copy(initialRotation));
  const originalRotation = useRef(new Euler().copy(initialRotation));
  const targetQuaternion = useRef(
    new Quaternion().setFromEuler(initialRotation)
  );
  const easeFactor = useRef(0);

  const getClosestRotation = (current, original) => {
    const currentRot =
      ((current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const originalRot =
      ((original % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const deltaRot = currentRot - originalRot;

    if (deltaRot > Math.PI) return originalRot + Math.PI * 2;
    if (deltaRot < -Math.PI) return originalRot - Math.PI * 2;
    return originalRot;
  };

  const updateRotation = (object, hovered, delta) => {
    if (hovered) {
      rotation.current.y += 0.01;
      easeFactor.current = Math.min(easeFactor.current + delta, 1);
    } else {
      rotation.current.y = MathUtils.damp(
        rotation.current.y,
        getClosestRotation(rotation.current.y, originalRotation.current.y),
        4,
        delta
      );
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
