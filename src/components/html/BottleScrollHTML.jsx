import React, { useEffect, useState } from "react";
import { useScroll } from "@react-three/drei";
import { gsap } from "gsap";

const BottleScrollHTML = () => {
  const scroll = useScroll();
  const [isSection2H1Visible, setSection2H1Visible] = useState(true);
  const [isSection3H1Visible, setSection3H1Visible] = useState(true);
  const [isSection4H1Visible, setSection4H1Visible] = useState(true);
  const [leftPosition, setLeftPosition] = useState("20vw");

  // Define normalized scroll ranges for each section
  const scrollRanges = [
    { start: 0, end: 0 }, // Section 1
    { start: 0.25, end: 0.41 }, // Section 1
    { start: 0.44, end: 0.62 }, // Section 2
    { start: 0.67, end: 0.85 }, // Section 3
  ];

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
    };

    scroll.el?.addEventListener("scroll", updateOpacity);

    return () => {
      scroll.el?.removeEventListener("scroll", updateOpacity);
    };
  }, [scroll, scrollRanges]);

  // Handle button click to toggle the h1 inside section-2
  // Need to replace the h1 with the new div
  const handleSection2ButtonClick = () => {
    if (isSection2H1Visible) {
      gsap.to("#section-2 h1", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.querySelector("#section-2 h1").style.display = "none";
          setSection2H1Visible(false);
        },
      });
    } else {
      document.querySelector("#section-2 h1").style.display = "block";
      gsap.to("#section-2 h1", {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          setSection2H1Visible(true);
        },
      });
    }
  };

  // Handle button click to toggle the h1 inside section-3
  // Need to replace the h1 with the new div
  const handleSection3ButtonClick = () => {
    if (isSection3H1Visible) {
      gsap.to("#section-3 h1", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.querySelector("#section-3 h1").style.display = "none";
          setSection3H1Visible(false);
        },
      });
    } else {
      document.querySelector("#section-3 h1").style.display = "block";
      gsap.to("#section-3 h1", {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          setSection3H1Visible(true);
        },
      });
    }
  };

  // Handle button click to toggle the h1 inside section-4
  // Need to replace the h1 with the new div
  const handleSection4ButtonClick = () => {
    if (isSection4H1Visible) {
      gsap.to("#section-4 h1", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.querySelector("#section-4 h1").style.display = "none";
          setSection4H1Visible(false);
        },
      });
    } else {
      document.querySelector("#section-4 h1").style.display = "block";
      gsap.to("#section-4 h1", {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          setSection4H1Visible(true);
        },
      });
    }
  };

  // Update the left position based on the window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setLeftPosition("10vw");
      } else {
        setLeftPosition("20vw");
      }
    };

    handleResize(); // Set the initial value
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        id="section-1"
        style={{
          height: "190vh",
          width: "100vw",
          position: "relative",
        }}
      >
        <h1
          style={{ position: "absolute", top: "40%", left: leftPosition }}
        ></h1>
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
        <button
          style={{
            color: "black",
            position: "absolute",
            top: "20%",
            left: leftPosition,
          }}
          onClick={handleSection2ButtonClick}
        >
          Toggle Bottle Body
        </button>
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: leftPosition,
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
        <button
          style={{
            color: "black",
            position: "absolute",
            top: "20%",
            left: leftPosition,
          }}
          onClick={handleSection3ButtonClick}
        >
          Toggle Bottle Neck
        </button>
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: leftPosition,
          }}
        >
          Bottle Neck
        </h1>
      </div>
      <div
        id="section-4"
        style={{ height: "100vh", position: "relative", opacity: 1 }}
      >
        <button
          style={{
            color: "black",
            position: "absolute",
            top: "20%",
            left: leftPosition,
          }}
          onClick={handleSection4ButtonClick}
        >
          Toggle Bottle Lid
        </button>
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "20%",
            left: leftPosition,
          }}
        >
          Bottle Lid
        </h1>
      </div>
    </>
  );
};

export default BottleScrollHTML;
