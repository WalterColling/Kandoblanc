// ScrollTestComponent.jsx
import React, { useRef, useEffect } from "react";

const ScrollTestComponent = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 100); // Scrolls to 100px from the top
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "200px",
        overflowY: "scroll",
        border: "1px solid black",
      }}
    >
      <div style={{ height: "500px" }}>
        Scroll down to see me! This div is intentionally made tall to enable
        scrolling.
      </div>
    </div>
  );
};

export default ScrollTestComponent;
