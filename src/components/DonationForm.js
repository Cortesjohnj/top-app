import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import validateDonation from "./ValidateDonation";
import Spinner from "../components/Spinner";

const DonationForm = ({ submitForm, loading }) => {
  const { id: foundationId } = useParams();
  const { user, foundation } = useSelector((state) => state);

  const [values, setValues] = useState({
    idNumber: "",
    cardNumber: "",
    expYear: "",
    expMonth: "",
    cvc: "",
    amount: "",
    dues: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsMsg = validateDonation(values);
    setErrors({ ...errorsMsg });
    Object.keys(errorsMsg).length === 0 &&
      submitForm(values, foundationId, user);
  };

  return (
    <>
      {!loading ? (
        <div className="petform__rightContainer" data-testid="petForm">
          <form
            className="petform__rightContainerForm"
            onSubmit={handleSubmit}
            data-testid="petFormSubmit"
          >
            <h1 className="petform__rightContainerForm--title">
              {foundation.name}
            </h1>
            <h2 className="petform__rightContainerForm--text">Donation Info</h2>

            <div className="petform__rightContainerForm--inputs">
              <label
                className="petform__rightContainerForm--label"
                htmlFor="idNumber"
              >
                Identification Number
              </label>
              <input
                type="text"
                name="idNumber"
                className="petform__rightContainerForm--input"
                value={values.IdNumber}
                onChange={handleChange}
                data-testid="address"
              />
              {errors.idNumber && <p data-testid="errors">{errors.idNumber}</p>}
            </div>
            <div className="petform__rightContainerForm--inputs">
              <label
                className="petform__rightContainerForm--label"
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                className="petform__rightContainerForm--input"
                value={values.cardNumber}
                onChange={handleChange}
                data-testid="phoneNumber"
              />
              {errors.cardNumber && (
                <p data-testid="errors">{errors.cardNumber}</p>
              )}
            </div>
            <div className="donationForm__numberInputs">
              <div className="donationForm__numberInputs--field">
                <label className="petform__rightContainerForm--label">
                  Expiration Date
                </label>
                <div>
                  <select name="expMonth" id="expireMM" onChange={handleChange}>
                    <option value="">Month</option>
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Aug</option>
                    <option value="09">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                  <span> / </span>
                  <select name="expYear" id="expireYY" onChange={handleChange}>
                    <option value="">Year</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
                {errors.expDate && <p data-testid="errors">{errors.expDate}</p>}
              </div>
              <div className="donationForm__numberInputs--field">
                <label
                  className="petform__rightContainerForm--label"
                  htmlFor="cvc"
                >
                  CVC Number
                </label>
                <input
                  type="number"
                  name="cvc"
                  className="petform__rightContainerForm--input"
                  value={values.cvc}
                  onChange={handleChange}
                  data-testid="description"
                />
                {errors.cvc && <p data-testid="errors">{errors.cvc}</p>}
              </div>
            </div>
            <div className="donationForm__numberInputs">
              <div className="donationForm__numberInputs--field">
                <label
                  className="petform__rightContainerForm--label"
                  htmlFor="amount"
                >
                  Donation amount
                </label>
                <input
                  type="number"
                  name="amount"
                  className="petform__rightContainerForm--input"
                  value={values.donationAmount}
                  onChange={handleChange}
                  data-testid="description"
                />
                {errors.amount && <p data-testid="errors">{errors.amount}</p>}
              </div>
              <div className="donationForm__numberInputs--field">
                <label
                  className="petform__rightContainerForm--label"
                  htmlFor="dues"
                >
                  Dues
                </label>
                <input
                  type="number"
                  name="dues"
                  className="petform__rightContainerForm--input"
                  value={values.dues}
                  onChange={handleChange}
                  data-testid="description"
                />
                {errors.dues && <p data-testid="errors">{errors.dues}</p>}
              </div>
            </div>
            <button
              className="petform__rightContainerForm--button"
              type="submit"
            >
              DONATE
            </button>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DonationForm;
