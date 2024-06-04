import React, { useContext, useEffect, useState } from "react";
import LoadingContext from "../LoadingContext";

const Loading = () => {
  const { objectLoaded } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (objectLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 150); // Delay in milliseconds (200ms)

      // Clear the timeout if the component unmounts or objectLoaded changes
      return () => clearTimeout(timer);
    }
  }, [objectLoaded]);

  if (!isVisible) return null; // Hide the overlay after the delay
  return (
    <div style={styles.container}>
      <p style={styles.text}>Loading..</p>
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
    backgroundColor: "#f0f0f0",
    zIndex: 10, // Ensure this is on top
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
};

export default Loading;
