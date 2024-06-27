import React, { useContext, useEffect, useState } from "react";
import LoadingContext from "../LoadingContext";
import PlaceHolder from "/PlaceHolder.svg"; // Adjust the path as necessary

const IntroCopy = () => {
  const { objectLoaded } = useContext(LoadingContext);
  const [showCopy, setShowCopy] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (objectLoaded) {
      const fadeOutTimer = setTimeout(() => {
        setFadeOut(true);
      }, 4000); // Start fading out at 4000ms

      const hideTimer = setTimeout(() => {
        setShowCopy(false);
      }, 5000); // Hide after 5000ms

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [objectLoaded]);

  if (!showCopy) return null;

  return (
    <div style={styles.container}>
      <img
        src={PlaceHolder}
        alt="Placeholder"
        style={{
          ...styles.image,
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 1s ease-in-out", // Duration of 1000ms
        }}
      />
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
    zIndex: 10,
  },
  image: {
    width: "100%", // Adjust as necessary
    height: "100%", // Adjust as necessary
  },
};

export default IntroCopy;
