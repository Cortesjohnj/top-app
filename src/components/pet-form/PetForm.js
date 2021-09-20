import React, { useState } from "react";
import PetFormSignUp from "./PetFormSignUp";
import PetFormSuccess from "./PetFormSuccess";
import PetFormRepeat from "./PetFormRepeatjs";
import "../../assets/styles/PetForm.css";
import Slider2 from "../slider2/Slider2";
import { useDispatch, useSelector } from "react-redux";
import { createAdoption } from "../../store/actionCreators";

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  //Pendiente no me aparece el string

  function submitForm(values) {
    setIsSubmitted(true);
    dispatch(createAdoption(values));
  }

  const error = useSelector((state) => state.error);
  console.log(error);

  const [err] = useState(error);
  console.log("error", err);
  return (
    <>
      <div className={isSubmitted ? "petFormContainer2" : "petFormContainer"}>
        {!isSubmitted ? (
          <>
            <div className="petFormContainer__content--left">
              <Slider2 />
            </div>
            <PetFormSignUp submitForm={submitForm} />
          </>
        ) : (
          <>{err ? <PetFormRepeat /> : <PetFormSuccess />}</>
        )}
      </div>
    </>
  );
};

export default PetForm;
