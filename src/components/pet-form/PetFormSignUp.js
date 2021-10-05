import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePetForm from "./usePetForm";
import validateInfo from "./validateInfo";

const PetFormSignUp = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = usePetForm(
    submitForm,
    validateInfo
  );

  const statePet = useSelector((state) => state.selectedPet);
  const [pet, setPet] = useState({
    name: "",
    photoUrl: "",
  });

  useEffect(() => {
    setPet(statePet);
  }, [statePet]);

  return (
    <div className="petform__rightContainer" data-testid="petForm">
      <form
        className="petform__rightContainerForm"
        onSubmit={handleSubmit}
        data-testid="petFormSubmit"
      >
        <h1>{`You're one step closer to be with your dream companion ${pet.name}`}</h1>

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
            data-testid="address"
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className="petform__rightContainerForm--inputs">
          <label
            className="petform__rightContainerForm--label"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="phoneNumber"
            name="phoneNumber"
            className="petform__rightContainerForm--input"
            placeholder="Enter your phone number"
            value={values.phoneNumber}
            onChange={handleChange}
            data-testid="phoneNumber"
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
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
            data-testid="description"
          />
          {errors.description && (
            <p data-testid="errors">{errors.description}</p>
          )}
        </div>
        <button className="petform__rightContainerForm--button" type="submit">
          ADOPT ME
        </button>
      </form>
    </div>
  );
};

export default PetFormSignUp;
