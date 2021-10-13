import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DonationForm = () => {
  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="petform__rightContainer" data-testid="petForm">
      <form
        className="petform__rightContainerForm"
        onSubmit={handleSubmit}
        data-testid="petFormSubmit"
      >
        <h2>Donation Info</h2>

        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="address"
          >
            Id Number
          </label>
          <input
            type="text"
            name="idNumber"
            className="petform__rightContainerForm--input"
            value={values.IdNumber}
            onChange={handleChange}
            data-testid="address"
          />
        </div>
        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="phoneNumber"
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
        </div>
        <div className="donationForm__numberInputs">
          <div className="donationForm__numberInputs--field">
            <label
              className="petform__rightContainerForm--label"
              htmlFor="textarea"
            >
              Expiration Date
            </label>
            <div>
              <select name="expireMM" id="expireMM">
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
              <select name="expireYY" id="expireYY">
                <option value="">Year</option>
                <option value="21">2021</option>
                <option value="22">2022</option>
                <option value="23">2023</option>
                <option value="24">2024</option>
                <option value="25">2025</option>
                <option value="26">2026</option>
                <option value="27">2027</option>
                <option value="28">2028</option>
              </select>
            </div>
          </div>
          <div className="donationForm__numberInputs--field">
            <label
              className="petform__rightContainerForm--label"
              htmlFor="textarea"
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
          </div>
        </div>
        <div className="donationForm__numberInputs">
          <div className="donationForm__numberInputs--field">
            <label
              className="petform__rightContainerForm--label"
              htmlFor="textarea"
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
          </div>
          <div className="donationForm__numberInputs--field">
            <label
              className="petform__rightContainerForm--label"
              htmlFor="textarea"
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
          </div>
        </div>
        <button className="petform__rightContainerForm--button" type="submit">
          DONATE
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
