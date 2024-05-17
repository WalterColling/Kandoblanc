import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { Vector3 } from "three";
import { useScroll, ScrollControls } from "@react-three/drei";

function CameraRigScroll() {
  const { camera } = useThree();
  const timelineRef = useRef(null);
  const scroll = useScroll();

  // Camera positions defined outside of useEffect
  const positions = [
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.35, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.24, 0] },
    { position: [0, 0.3, 0.9], fov: 35, lookAt: [0, 0.11, 0] },
    { position: [0, 0.1, 0.5], fov: 35, lookAt: [0, 0.11, 0] },
    { position: [0, 0.1, 0.5], fov: 35, lookAt: [0, 0.32, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.32, 0] },
    { position: [0, 0.2, 0.5], fov: 35, lookAt: [0, 0.57, 0] },
  ];

  useEffect(() => {
    console.log("useEffect called");

    // Initialize timeline
    const timeline = gsap.timeline({ paused: true });
    timelineRef.current = timeline;

    positions.forEach((pos, i) => {
      console.log(`Adding tween for position ${i}`);
      timeline.to(
        camera.position,
        {
          x: pos.position[0],
          y: pos.position[1],
          z: pos.position[2],
          duration: 1,
          onUpdate: () => camera.lookAt(new Vector3(...pos.lookAt)),
        },
        i
      );
      timeline.to(
        camera,
        {
          fov: pos.fov,
          duration: 1,
          onUpdate: () => camera.updateProjectionMatrix(),
        },
        i
      );
    });
  }, [camera]);

  useFrame(() => {
    if (timelineRef.current) {
      const progress = scroll.offset;
      console.log(`Scroll progress: ${progress}`);
      timelineRef.current.progress(progress * (positions.length - 1));
    }
  });

  return null;
}

export default CameraRigScroll;
