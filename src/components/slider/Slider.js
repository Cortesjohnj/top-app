import React, { useState } from "react";
import "../../assets/styles/Slider.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft
        className="slider__left-arrow"
        onClick={prevSlide}
      />
      <FaArrowAltCircleRight
        className="slider__right-arrow"
        onClick={nextSlide}
      />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slider__active" : "slider__slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt={slide.name} className="slider__img" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Slider;
