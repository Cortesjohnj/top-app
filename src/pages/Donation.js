import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import DonationForm from "../components/DonationForm";
import { createPayment } from "../store/actionCreators";

import "../assets/styles/Donation.css";

const Donation = () => {
  const { id: foundationId } = useParams();
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  function submitForm(values) {
    dispatch(createPayment(values, foundationId, user));
  }

  return (
    <>
      <div className={"petFormContainer petFormGrid"}>
        <>
          <div className="petFormContainer__content--left"></div>
          <DonationForm submitForm={submitForm} />
        </>
      </div>
    </>
  );
};

export default Donation;
