import React, { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { gsap } from "gsap";

const BottleScrollHTML = () => {
  const scroll = useScroll();

  // Define normalized scroll ranges for each section
  const scrollRanges = [
    { start: 0, end: 0.05 }, // Section 1
    { start: 0.08, end: 0.18 }, // Section 2
    { start: 0.22, end: 0.37 }, // Section 3
    { start: 0.47, end: 0.63 }, // Section 4
    { start: 0.7, end: 0.86 }, // Section 5
  ];

  let lastScrollPosition = 0;

  useEffect(() => {
    const updateOpacity = () => {
      const scrollPosition = scroll.offset; // Get the normalized scroll position
      // console.log("Normalized Scroll Position:", scrollPosition);

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
        style={{ height: "100vh", position: "relative", opacity: 1 }}
      >
        <h1 style={{ position: "absolute", top: "40%", left: "0.5em" }}>
          Section 1
        </h1>
      </div>
      <div
        id="section-2"
        style={{ height: "80vh", position: "relative", opacity: 1 }}
      >
        <h1 style={{ position: "absolute", top: "20%", left: "0.5em" }}>
          Section 2
        </h1>
      </div>
      <div
        id="section-3"
        style={{ height: "100vh", position: "relative", opacity: 1 }}
      >
        <h1 style={{ position: "absolute", top: "20%", left: "0.5em" }}>
          Section 3
        </h1>
      </div>
      <div
        id="section-4"
        style={{ height: "150vh", position: "relative", opacity: 1 }}
      >
        <h1 style={{ position: "absolute", top: "20%", left: "0.5em" }}>
          Section 4
        </h1>
      </div>
      <div
        id="section-5"
        style={{ height: "100vh", position: "relative", opacity: 1 }}
      >
        <h1 style={{ position: "absolute", top: "20%", left: "0.5em" }}>
          Section 5
        </h1>
      </div>
    </>
  );
};

export default BottleScrollHTML;
