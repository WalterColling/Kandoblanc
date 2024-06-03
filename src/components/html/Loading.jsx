import React, { useContext } from "react";
import LoadingContext from "../LoadingContext";

const Loading = () => {
  const { objectLoaded } = useContext(LoadingContext);

  if (objectLoaded) return null; // Hide the overlay when the object is loaded
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
