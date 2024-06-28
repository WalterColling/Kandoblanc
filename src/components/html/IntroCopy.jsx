import React, { useContext, useEffect, useState } from "react";
import LoadingContext from "../LoadingContext";
import Lottie from "lottie-react";

const IntroCopy = () => {
  const { objectLoaded } = useContext(LoadingContext);
  const [showCopy, setShowCopy] = useState(true);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(80);
  const [animationOpacity, setAnimationOpacity] = useState(1);

  useEffect(() => {
    // Fetch lottie from the provided link
    fetch(
      "https://lottie.host/e079c7df-2fd4-4804-a9fe-7380893bec19/336T2xE07q.json"
    )
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation data:", error));
  }, []);

  useEffect(() => {
    // only trigger animation after the object is loaded
    if (objectLoaded && animationData) {
      const animationStartTimer = setTimeout(() => {
        setAnimationPlaying(true);

        // Deactivates the component - it should be the total animation time
        const hideCopyTimer = setTimeout(() => {
          setShowCopy(false);
        }, 6000);

        //trigger lootie fade out
        const fadeAnimationTimer = setTimeout(() => {
          setAnimationOpacity(0);
        }, 5000);

        // Trigger the opacity fade out
        const opacityTimer = setTimeout(() => {
          setBackgroundOpacity(0);
        }, 4000);

        return () => {
          clearTimeout(hideCopyTimer);
          clearTimeout(fadeAnimationTimer);
          clearTimeout(opacityTimer);
        };
      }, 1000); // Delay of 2000ms before starting the animation

      return () => {
        clearTimeout(animationStartTimer);
      };
    }
  }, [objectLoaded, animationData]);

  if (!showCopy || !animationData) return null;

  const animationStyle = {
    width: "80vw",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    opacity: animationOpacity,
    transition: "opacity 1000ms", // lottie transition length
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: `rgba(24, 24, 30, ${backgroundOpacity / 100})`,
        transition: "background-color 3000ms", // background transition length
      }}
    >
      {animationPlaying && (
        <div style={animationStyle}>
          <Lottie animationData={animationData} loop={false} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 24, 30, 0.8)",
    zIndex: 10,
  },
};

export default IntroCopy;
