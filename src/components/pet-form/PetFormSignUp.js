import React from 'react';
import usePetForm from './usePetForm';
import validateInfo from './validateInfo';

const PetFormSignUp = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = usePetForm(
    submitForm,
    validateInfo
  );

  return (
    <div className="petform__rightContainer">
      <form className="petform__rightContainerForm" onSubmit={handleSubmit}>
        <h1>You're one step closer to be with your dream companion</h1>
        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="petform__rightContainerForm--input"
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div className="petform__rightContainerForm--inputs">
          <label className="petform__rightContainerForm--label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="petform__rightContainerForm--input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="address"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            className="petform__rightContainerForm--input"
            placeholder="Enter your address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className="petform__rightContainerForm--inputs">
          <label className="petform__rightContainerForm--label" htmlFor="tel">
            Phone Number
          </label>
          <input
            id="tel"
            type="tel"
            name="tel"
            className="petform__rightContainerForm--input"
            placeholder="Enter your phone number"
            value={values.tel}
            onChange={handleChange}
          />
          {errors.tel && <p>{errors.tel}</p>}
        </div>
        <button className="petform__rightContainerForm--button" type="submit">
          ADOPT ME
        </button>
      </form>
    </div>
  );
};

export default PetFormSignUp;
