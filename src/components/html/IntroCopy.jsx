import React, { useContext, useEffect, useState } from "react";
import LoadingContext from "../LoadingContext";

const IntroCopy = () => {
  const { objectLoaded } = useContext(LoadingContext);
  const [showCopy, setShowCopy] = useState(true);

  useEffect(() => {
    if (objectLoaded) {
      const timer = setTimeout(() => {
        setShowCopy(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [objectLoaded]);

  if (!showCopy) return null;

  return (
    <div style={styles.container}>
      <p style={styles.text}>Copy Goes here</p>
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
    backgroundColor: "rgba(240, 240, 240, 0.5)", // 50% opacity
    zIndex: 10,
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
};

export default IntroCopy;
