import React, { useEffect, useState } from "react";
import PetFormSignUp from "./PetFormSignUp";
import PetFormSuccess from "./PetFormSuccess";
import PetFormRepeat from "./PetFormRepeatjs";
import "../../assets/styles/PetForm.css";
import Slider2 from "../slider2/Slider2";
import { useDispatch, useSelector } from "react-redux";
import { createAdoption } from "../../store/actionCreators";

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  function submitForm(values) {
    setIsSubmitted(true);
    dispatch(createAdoption(values));
  }

  const error = useSelector((state) => state.error);
  const [err, setError] = useState(error);

  useEffect(() => {
    setError(error);
  }, [error]);

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
          <>
            {err.length >= 1 ? (
              <PetFormRepeat />
            ) : (
              err.length === 0 && <PetFormSuccess />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PetForm;
