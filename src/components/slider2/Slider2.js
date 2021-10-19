import React, { useEffect, useState } from "react";
import "../../assets/styles/Slider2.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectPet } from "../../store/actionCreators";

const Slider2 = () => {
  const dispatch = useDispatch();
  const { id: petId } = useParams();
  const statePet = useSelector((state) => state.selectedPet);
  const [pet, setPet] = useState([]);

  useEffect(() => {
    dispatch(selectPet(petId));
  }, [dispatch, petId]);

  useEffect(() => {
    setPet(statePet);
  }, [statePet]);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === pet.photoUrl.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? pet.photoUrl.length - 1 : current - 1);
  };

  if (!Array.isArray(pet.photoUrl) || pet.photoUrl.length <= 0) {
    return null;
  }

  return (
    <section className="slider2">
      <FaArrowAltCircleLeft
        className="slider__left-arrow2"
        onClick={prevSlide}
      />
      <FaArrowAltCircleRight
        className="slider__right-arrow2"
        onClick={nextSlide}
      />
      {pet.photoUrl.map((photo, index) => {
        return (
          <div
            className={index === current ? "slider__active2" : "slider__slide2"}
            key={index}
          >
            {index === current && (
              <img src={photo} alt={pet.name} className="slider__img2" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Slider2;
