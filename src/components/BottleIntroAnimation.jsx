import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LoadingContext from "./LoadingContext";
import Model from "./Model";

export function BottleIntro({ ...props }) {
  const { setObjectLoaded } = useContext(LoadingContext);

  const floorRef = useRef();
  const liquidRef = useRef();
  const bottleRef = useRef();
  const topRef = useRef();
  const neckRef = useRef();
  const obj = useRef();

  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
  };

  useEffect(() => {
    if (isModelLoaded) {
      // All models and materials are loaded, set the context to hide the overlay
      setObjectLoaded(true);

      // Start the initial animation
      gsap.from([topRef.current.position], {
        duration: 2.5,
        y: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from([neckRef.current.position], {
        duration: 2.2,
        y: 0.3,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from([obj.current.position], {
        duration: 3,
        y: 0.25,
        z: 0.6,
        ease: "power3.out",
      });
      gsap.from([obj.current.rotation], {
        duration: 4.2,
        y: -3,
        ease: "power3.out",
      });

      // Trigger the second animation after 4 seconds
      gsap.delayedCall(3.5, () => {
        gsap.to(obj.current.position, {
          duration: 2,
          y: obj.current.position.y + 0.05, // Adjust the y-axis value as needed
          ease: "power3.out",
        });
      });
    }
  }, [isModelLoaded, setObjectLoaded]);

  return (
    <group ref={obj} {...props} dispose={null}>
      <Model
        refs={{
          Bottle_Low: bottleRef,
          Top: topRef,
          Neck: neckRef,
          Liquid: liquidRef,
          Floor: floorRef,
        }}
        meshNames={["Bottle_Low", "Top", "Neck", "Liquid", "Floor"]}
        onLoaded={handleModelLoaded} // Ensure model loaded callback is set
      />
    </group>
  );
}
