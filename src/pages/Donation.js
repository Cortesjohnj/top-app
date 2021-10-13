import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DonationForm from "../components/DonationForm";
import Slider2 from "../components/slider2/Slider2";
import { createAdoption } from "../store/actionCreators";

import "../assets/styles/Donation.css";

const Donation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();

  function submitForm(values) {
    setIsSubmitted(true);
    dispatch(createAdoption(values));
  }

  const { error, errStatus } = useSelector(state => ({
    error: state.error,
    errStatus: state.errStatus,
  }));
  const [err, setError] = useState(error);

  useEffect(() => {
    setError(error);
  }, [error]);
  return (
    <>
      <div className={"petFormContainer petFormGrid"}>
        <>
          <div className="petFormContainer__content--left">
            <Slider2 />
          </div>
          <DonationForm submitForm={submitForm} />
        </>
      </div>
    </>
  );
};

export default Donation;
