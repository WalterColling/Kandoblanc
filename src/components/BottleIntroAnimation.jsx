import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LoadingContext from "./LoadingContext";

export function BottleIntro({ ...props }) {
  const { setObjectLoaded } = useContext(LoadingContext);

  const floorRef = useRef();
  const liquidRef = useRef();
  const bottleRef = useRef();
  const topRef = useRef();
  const neckRef = useRef();
  const obj = useRef();

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [Model, setModel] = useState(null);
  const [animationTriggered, setAnimationTriggered] = useState(false); // Local state to trigger animation

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
  };

  useEffect(() => {
    (async () => {
      // Dynamically import the Model component
      const modelModule = await import("./Model");
      setModel(() => modelModule.default);
    })();

    if (isModelLoaded) {
      // All models and materials are loaded, set the context to hide the overlay
      setObjectLoaded(true);

      // Introduce a small delay before starting the initial animation
      gsap.delayedCall(0.2, () => {
        // Start the initial animation
        if (topRef.current) {
          gsap.from([topRef.current.position], {
            duration: 4.5,
            y: 0.6,
            ease: "power3.out",
            delay: 0.2,
          });
        }

        if (neckRef.current) {
          gsap.from([neckRef.current.position], {
            duration: 4.2,
            y: 0.3,
            ease: "power3.out",
            delay: 0.2,
          });
        }

        if (obj.current) {
          gsap.from([obj.current.position], {
            duration: 5,
            x: -0.05,
            y: 0.2,
            z: 0.6,
            ease: "power3.out",
          });

          gsap.from([obj.current.rotation], {
            duration: 5.2,
            y: -3,
            ease: "power3.out",
          });
        }

        // Trigger the second animation after the initial one is complete
        setAnimationTriggered(true);
      });
    }
  }, [isModelLoaded, setObjectLoaded]);

  useEffect(() => {
    if (animationTriggered) {
      gsap.delayedCall(4.5, () => {
        if (obj.current) {
          gsap.to(obj.current.position, {
            duration: 2,
            y: obj.current.position.y + 0.05, // Adjust the y-axis value as needed
            ease: "power3.out",
          });
        }
      });
    }
  }, [animationTriggered]);

  return (
    <group ref={obj} {...props} dispose={null}>
      {Model && (
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
      )}
    </group>
  );
}

export default BottleIntro;
