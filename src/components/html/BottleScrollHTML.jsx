import React, { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { gsap } from "gsap";

const BottleScrollHTML = () => {
  const scroll = useScroll();

  // Define normalized scroll ranges for each section
  const scrollRanges = [
    { start: 0, end: 0 }, // Section 1
    { start: 0.25, end: 0.41 }, // Section 1
    { start: 0.44, end: 0.62 }, // Section 2
    { start: 0.67, end: 0.85 }, // Section 3
  ];

  let lastScrollPosition = 0;

  useEffect(() => {
    const updateOpacity = () => {
      const scrollPosition = scroll.offset; // Get the normalized scroll position
      console.log("Normalized Scroll Position:", scrollPosition);

      scrollRanges.forEach((range, i) => {
        const { start, end } = range;

        if (scrollPosition >= start && scrollPosition <= end) {
          // Within range, set opacity to 1
          gsap.to(`#section-${i + 1}`, { opacity: 1, duration: 0.5 });
        } else {
          // Outside range, set opacity to 0
          gsap.to(`#section-${i + 1}`, { opacity: 0, duration: 0.5 });
        }
      });

      lastScrollPosition = scrollPosition;
    };

    scroll.el?.addEventListener("scroll", updateOpacity);

    return () => {
      scroll.el?.removeEventListener("scroll", updateOpacity);
    };
  }, [scroll, scrollRanges]);

  return (
    <>
      <div
        id="section-1"
        style={{
          height: "190vh",
          position: "relative",
        }}
      >
        <h1 style={{ position: "absolute", top: "40%", left: "0.5em" }}></h1>
      </div>
      <div
        id="section-2"
        style={{
          color: "white",
          height: "100vh",
          position: "relative",
          opacity: 1,
        }}
      >
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: "0.5em",
          }}
        >
          Bottle Body
        </h1>
      </div>
      <div
        id="section-3"
        style={{
          color: "white",
          height: "120vh",
          position: "relative",
          opacity: 1,
        }}
      >
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: "0.5em",
          }}
        >
          Bottle Neck
        </h1>
      </div>
      <div
        id="section-4"
        style={{ height: "100vh", position: "relative", opacity: 1 }}
      >
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: "0.5em",
          }}
        >
          Bottle Lid
        </h1>
      </div>
    </>
  );
};

export default BottleScrollHTML;
