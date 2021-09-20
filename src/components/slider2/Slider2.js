import React, { useEffect, useState } from "react";
import "../../assets/styles/Slider2.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectPet } from "../../store/actionCreators";

const Slider2 = () => {
  const dispatch = useDispatch();
  const { id: petId } = useParams();
  const pet2 = useSelector((state) => state.selectedPet);
  const { name, photoUrl, age } = pet2;
  const [pet] = useState({
    name: name,
    photoUrl: photoUrl,
    age: age,
  });

  useEffect(() => {
    dispatch(selectPet(petId));
  }, [dispatch, petId]);

  const [current, setCurrent] = useState(0);
  const length = pet.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(photoUrl) || photoUrl <= 0) {
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
      {photoUrl.map((photo, index) => {
        return (
          <div
            className={index === current ? "slider__active" : "slider__slide"}
            key={index}
          >
            {index === current && (
              <img src={photo} alt={name} className="slider__img" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Slider2;
