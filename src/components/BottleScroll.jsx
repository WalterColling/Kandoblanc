import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Euler } from "three";
import debounce from "lodash.debounce";
import { useLerpPosition } from "./useLerpPosition";
import { useSmoothRotation } from "./useSmoothRotation";
import LoadingContext from "./LoadingContext";

export function BottleScroll(props) {
  const { setObjectLoaded } = useContext(LoadingContext);
  const scroll = useScroll();

  const LiquidRef = useRef();
  const FloorRef = useRef();
  const bottleRef = useRef();
  const topRef = useRef();
  const neckRef = useRef();
  const objRef = useRef();

  const bottleProxyRef = useRef();
  const topProxyRef = useRef();
  const neckProxyRef = useRef();

  const [hovered, setHovered] = useState({
    bottle: false,
    top: false,
    neck: false,
  });
  const [atLastIndex, setAtLastIndex] = useState(false);

  const initialPositions = {
    bottle: [0, 0.053, 0],
    top: [0, 0.226794, 0],
    neck: [0, 0.181, 0],
  };

  const initialRotations = {
    bottle: [0, 0, 0],
    top: [0, 0, 0],
    neck: [0, 0, 0],
  };

  const positions = useMemo(
    () => [
      { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
      { bottle: [0, 0.0, 0], top: [0, 0.2, 0], neck: [0, 0.15, 0] },
      { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
      { bottle: [0, 0.0, 0], top: [0, 0.25, 0], neck: [0, 0.15, 0] },
      { bottle: [0, 0.0, 0], top: [0, 0.2, 0], neck: [0, 0.1, 0] },
      { bottle: [0, 0.0, 0], top: [0, 0.0, 0], neck: [0, 0.0, 0] },
    ],
    []
  );

  const bottlePositions = useMemo(
    () =>
      positions.map((p) => [
        p.bottle[0],
        p.bottle[1] + initialPositions.bottle[1],
        p.bottle[2],
      ]),
    [positions]
  );
  const topPositions = useMemo(
    () =>
      positions.map((p) => [
        p.top[0],
        p.top[1] + initialPositions.top[1],
        p.top[2],
      ]),
    [positions]
  );
  const neckPositions = useMemo(
    () =>
      positions.map((p) => [
        p.neck[0],
        p.neck[1] + initialPositions.neck[1],
        p.neck[2],
      ]),
    [positions]
  );

  const updateBottlePosition = useLerpPosition(bottlePositions);
  const updateTopPosition = useLerpPosition(topPositions);
  const updateNeckPosition = useLerpPosition(neckPositions);

  const updateBottleRotation = useSmoothRotation(
    new Euler(...initialRotations.bottle)
  );
  const updateTopRotation = useSmoothRotation(
    new Euler(...initialRotations.top)
  );
  const updateNeckRotation = useSmoothRotation(
    new Euler(...initialRotations.neck)
  );

  useFrame((state, delta) => {
    const offset = scroll.offset * (positions.length - 1);

    updateBottlePosition(bottleRef, offset);
    updateTopPosition(topRef, offset);
    updateNeckPosition(neckRef, offset);

    // Update proxy positions
    if (bottleRef.current && bottleProxyRef.current) {
      bottleProxyRef.current.position.copy(bottleRef.current.position);
    }
    if (topRef.current && topProxyRef.current) {
      topProxyRef.current.position.copy(topRef.current.position);
    }
    if (neckRef.current && neckProxyRef.current) {
      neckProxyRef.current.position.copy(neckRef.current.position);
    }

    const atLastIndexNow = scroll.offset >= 0.99;
    if (atLastIndexNow !== atLastIndex) {
      setAtLastIndex(atLastIndexNow);
      if (atLastIndexNow) {
        setHovered((prev) => ({
          bottle: true,
          top: true,
          neck: true,
        }));
      } else {
        setHovered((prev) => ({
          bottle: false,
          top: false,
          neck: false,
        }));
      }
    }

    updateBottleRotation(bottleRef, hovered.bottle || atLastIndexNow, delta);
    updateTopRotation(topRef, hovered.top || atLastIndexNow, delta);
    updateNeckRotation(neckRef, hovered.neck || atLastIndexNow, delta);
  });

  const debouncedSetHovered = useCallback(
    debounce((part, value) => {
      setHovered((prev) => ({ ...prev, [part]: value }));
    }, 14),
    []
  );

  const handlePointerOver = useCallback(
    (part) => (event) => {
      event.stopPropagation();
      debouncedSetHovered(part, true);
    },
    [debouncedSetHovered]
  );

  const handlePointerOut = useCallback(
    (part) => (event) => {
      event.stopPropagation();
      setHovered((prev) => ({ ...prev, [part]: false }));
      debouncedSetHovered.cancel();
    },
    [debouncedSetHovered]
  );

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
    setObjectLoaded(true);
  };

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [Model, setModel] = useState(null);

  useEffect(() => {
    (async () => {
      const modelModule = await import("./Model");
      setModel(() => modelModule.default);
    })();
  }, []);

  return (
    <group ref={objRef} {...props} dispose={null}>
      {Model && (
        <Model
          refs={{
            Bottle_Low: bottleRef,
            Top: topRef,
            Neck: neckRef,
            Liquid: LiquidRef,
            Floor: FloorRef,
            Bottle_Proxy: bottleProxyRef,
            Top_Proxy: topProxyRef,
            Neck_Proxy: neckProxyRef,
          }}
          hoverEffects={{
            Bottle_Low: hovered.bottle || atLastIndex,
            Top: hovered.top || atLastIndex,
            Neck: hovered.neck || atLastIndex,
          }}
          atLastIndex={atLastIndex}
          meshNames={[
            "Bottle_Low",
            "Top",
            "Neck",
            "Liquid",
            "Floor",
            "Bottle_Proxy",
            "Top_Proxy",
            "Neck_Proxy",
          ]}
          onLoaded={handleModelLoaded}
          onPointerOverHandlers={{
            Bottle_Proxy: handlePointerOver("bottle"),
            Top_Proxy: handlePointerOver("top"),
            Neck_Proxy: handlePointerOver("neck"),
          }}
          onPointerOutHandlers={{
            Bottle_Proxy: handlePointerOut("bottle"),
            Top_Proxy: handlePointerOut("top"),
            Neck_Proxy: handlePointerOut("neck"),
          }}
          {...props}
        />
      )}
    </group>
  );
}

export default BottleScroll;
