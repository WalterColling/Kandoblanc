import React, { useState, useEffect } from "react";

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|windows phone|iemobile|wpdesktop/i.test(
    userAgent
  );
};

const MobileScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobileDevice()) {
      setIsVisible(true);
    }
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        display: isVisible ? "flex" : "none",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    ></div>
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
    backgroundColor: "rgba(24, 24, 30, 0)", // Start with 80% opacity
    zIndex: 11,
  },
};

export default MobileScroll;
