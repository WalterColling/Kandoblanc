import React, { useEffect, useRef, useState } from "react";

const IntroCopy2 = () => {
  const [isVisible, setIsVisible] = useState(true);
  const touchStartRef = useRef(null);
  const containerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    hasTriggeredRef.current = false; // Reset the flag for each new touch
    console.log("Touch start:", touchStartRef.current);
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current || hasTriggeredRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    console.log("Touch move - deltaX:", deltaX, "deltaY:", deltaY);

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe detected
      console.log("Horizontal swipe detected");
      setIsVisible(false);
      hasTriggeredRef.current = true;

      // Simulate touch end
      const touchEndEvent = new TouchEvent("touchend", {
        touches: e.touches,
        targetTouches: e.targetTouches,
        changedTouches: e.changedTouches,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(touchEndEvent);

      // Simulate touch start
      setTimeout(() => {
        const touchStartEvent = new TouchEvent("touchstart", {
          touches: e.touches,
          targetTouches: e.targetTouches,
          changedTouches: e.changedTouches,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(touchStartEvent);
      }, 10); // Short delay to ensure events are processed

      // Re-enable the div after a short delay
      setTimeout(() => {
        setIsVisible(true);
        console.log("Div re-enabled");
      }, 300);
    }
  };

  const handleTouchEnd = () => {
    console.log("Touch end");
    touchStartRef.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <div
      id="intro-copy2-container"
      ref={containerRef}
      style={{
        ...styles.container,
        display: isVisible ? "flex" : "none",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div style={styles.text}>Swipe horizontally to hide this</div>
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

export default IntroCopy2;
