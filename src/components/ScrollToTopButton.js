import React, { useEffect, useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { animateScroll as ScrollToTop } from "react-scroll";
import "../assets/styles/ScrollToTopButton.css";

function ScrollToTopButton() {
  const [yPosition, setYPosition] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      setYPosition(scrolled);
    });
  }, []);

  return (
    <div
      className={yPosition >= 0.12 ? "backToTop" : "hide"}
      onClick={() => ScrollToTop.scrollToTop()}
    >
      <BiUpArrow className="arrowIcon" />
    </div>
  );
}

export default ScrollToTopButton;
