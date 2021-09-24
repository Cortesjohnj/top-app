import React, { useEffect, useState } from "react";
import PetFormSignUp from "./PetFormSignUp";
import PetFormSuccess from "./PetFormSuccess";
import PetFormRepeat from "./PetFormRepeatjs";
import "../../assets/styles/PetForm.css";
import Slider2 from "../slider2/Slider2";
import { useDispatch, useSelector } from "react-redux";
import { createAdoption } from "../../store/actionCreators";
import { FINISHED, INITIALIZED } from "../../store/actions";
import Spinner from "../../components/Spinner";

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();

  function submitForm(values) {
    setIsSubmitted(true);
    dispatch(createAdoption(values));
  }

  const { error, errStatus } = useSelector((state) => ({
    error: state.error,
    errStatus: state.errStatus,
  }));
  const [err, setError] = useState(error);

  useEffect(() => {
    setError(error);
  }, [error]);

  function renderSubmitted() {
    if (errStatus === INITIALIZED) {
      return <Spinner />;
    }
    return (
      <>
        {err.length >= 1 && errStatus === FINISHED ? (
          <PetFormRepeat />
        ) : (
          err.length === 0 && <PetFormSuccess />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={
          isSubmitted ? "petFormContainer" : "petFormContainer petFormGrid"
        }
      >
        {!isSubmitted ? (
          <>
            <div className="petFormContainer__content--left">
              <Slider2 />
            </div>
            <PetFormSignUp submitForm={submitForm} />
          </>
        ) : (
          renderSubmitted()
        )}
      </div>
    </>
  );
};

export default PetForm;
