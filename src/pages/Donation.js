import { useState } from "react";
import DonationForm from "../components/DonationForm";

import "../assets/styles/Donation.css";
import axios from "../axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Donation = () => {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const { foundation } = useSelector((state) => state);

  const donationSuccessful = () => {
    MySwal.fire({
      title: <strong>Thanks for your donation!</strong>,
      icon: "success",
    });
  };
  const donationError = () => {
    MySwal.fire({
      title: <strong>Oops...!</strong>,
      html: <i>Something went wrong, please try again later!</i>,
      icon: "error",
    });
  };
  async function submitForm(values, foundationId, user) {
    try {
      setLoading(true);
      const data = {
        "card[number]": values.cardNumber,
        "card[exp_year]": values.expYear,
        "card[exp_month]": values.expMonth,
        "card[cvc]": values.cvc,
        name: user.name,
        last_name: "",
        email: user.email,
        default: true,
        city: "Bogota",
        address: user.address || "",
        phone: user.phoneNumber || "",
        cell_phone: "",
        doc_type: "CC",
        doc_number: values.idNumber,
        value: values.amount,
        currency: "COP",
        dues: values.dues,
        ip: "0.0.0.0",
        use_default_card_customer: true,
        foundationId,
      };
      await axios.post(`/donate/payment`, data);
      setLoading(false);

      donationSuccessful();
    } catch (e) {
      setLoading(false);
      console.log(e);
      donationError();
    }
  }

  return (
    <div className={"petFormContainer petFormGrid"}>
      <div className="petFormContainer__content--left">
        <img
          className="petFormContainer__content--left--img"
          src={foundation.photo_url}
          alt={foundation.name}
        />
        <h2 className="petFormContainer__content--left--text">
          Thank you for your generous gift to an Adogta foundation. We are
          thrilled to have your support. Through your donation, we have been
          able to help the most needed pets, and continue working towards
          creating meaningful connections. You truly make a difference for us,
          and we are extremely grateful!
        </h2>
      </div>
      <DonationForm submitForm={submitForm} loading={loading} />
    </div>
  );
};

export default Donation;
