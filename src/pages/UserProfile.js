import React from "react";
import { PrimaryButton } from "../components/PrimaryButton";

function UserProfile() {
  return (
    <section className="userProfile">
      <div className="userProfile__container">
        <h2 className="userProfile__container--title"> Hello Name!</h2>
        <form className="userProfile__container--form">
          <label
            htmlFor="imageUpload"
            className="updateProfilePic userProfile__container--inputs"
          >
            Change profile picture
          </label>
          <input type="file" id="imageUpload" accept="image/*" hidden />
          <input
            type="text"
            name="firstName"
            value="Pedro"
            className="userProfile__container--inputs"
          />
          <input
            type="text"
            name="lastName"
            value="Perez"
            className="userProfile__container--inputs"
          />
          <input
            type="email"
            name="email"
            value="Example@test.com"
            className="userProfile__container--inputs"
          />
          <input
            type="text"
            name="address"
            value="Calle falsa 123"
            className="userProfile__container--inputs"
          />
          <input
            type="number"
            name="phoneNumber"
            value="3004127821"
            className="userProfile__container--inputs"
          />
          <PrimaryButton
            children={"Update profile"}
            color={"primaryButton"}
            id="submitButton"
          />
        </form>
      </div>
    </section>
  );
}

export default UserProfile;
