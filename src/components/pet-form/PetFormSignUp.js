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
        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="textarea"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            col="100"
            row="200"
            className="petform__rightContainerForm--textarea"
            placeholder="Enter a complete description"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <button className="petform__rightContainerForm--button" type="submit">
          ADOPT ME
        </button>
      </form>
    </div>
  );
};

export default PetFormSignUp;
