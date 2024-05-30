import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export function AdaptivePixelRatio() {
  const current = useThree((state) => state.performance.current);
  const setPixelRatio = useThree((state) => state.setDpr);

  const prevCurrentRef = useRef();

  useEffect(() => {
    if (prevCurrentRef.current !== current) {
      setPixelRatio(window.devicePixelRatio * current);
      prevCurrentRef.current = current;
    }
  }, [current, setPixelRatio]);

  return null;
}
