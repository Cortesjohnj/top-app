import React, { useState } from "react";
import PetFormSignUp from "./PetFormSignUp";
import PetFormSuccess from "./PetFormSuccess";
import "../../assets/styles/PetForm.css";
import { SliderData2 } from "../slider2/SliderData2";
import Slider2 from "../slider2/Slider2";
import { useDispatch } from "react-redux";
import { createAdoption } from "../../store/actionCreators";

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  function submitForm(values) {
    setIsSubmitted(true);
    dispatch(createAdoption(values));
  }

  return (
    <>
      <div className={isSubmitted ? "petFormContainer2" : "petFormContainer"}>
        {!isSubmitted ? (
          <>
            <div className="petFormContainer__content--left">
              <Slider2 slides2={SliderData2} />
            </div>
            <PetFormSignUp submitForm={submitForm} />
          </>
        ) : (
          <PetFormSuccess />
        )}
      </div>
    </>
  );
};

export default PetForm;
