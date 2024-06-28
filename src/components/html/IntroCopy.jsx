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
    // Fetch the animation data from the provided link
    fetch(
      "https://lottie.host/81dee815-db95-4237-92ef-ecb411fa87ca/ceTkbrqRS7.json"
    )
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation data:", error));
  }, []);

  useEffect(() => {
    if (objectLoaded && animationData) {
      setAnimationPlaying(true);

      // Hide the copy and animation after specific times
      const hideCopyTimer = setTimeout(() => {
        setShowCopy(false);
      }, 5000);

      const fadeAnimationTimer = setTimeout(() => {
        setAnimationOpacity(0);
      }, 4000);

      // Trigger the opacity transition after 1500ms
      const opacityTimer = setTimeout(() => {
        setBackgroundOpacity(0);
      }, 3000);

      return () => {
        clearTimeout(hideCopyTimer);
        clearTimeout(fadeAnimationTimer);
        clearTimeout(opacityTimer);
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
    transition: "opacity 1000ms",
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: `rgba(24, 24, 30, ${backgroundOpacity / 100})`,
        transition: "background-color 3000ms",
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
    backgroundColor: "rgba(24, 24, 30, 0.8)", // Start with 80% opacity
    zIndex: 10,
  },
};

export default IntroCopy;
