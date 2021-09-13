import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../assets/styles/UserProfile.css";
import { PrimaryButton } from "../components/PrimaryButton";

function Profile() {
  const [updateProfile, setUpdateProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    photoUrl: null,
  });

  const cleanup = () => {
    URL.revokeObjectURL(updateProfile);
  };

  const setImage = newImage => {
    if (updateProfile) {
      cleanup();
    }
    setUpdateProfile(prevState => ({
      ...prevState,
      photoUrl: newImage,
    }));
  };

  const handlePhoto = event => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUpdateProfile(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(updateProfile);

  return (
    <section className="userProfile">
      <div className="userProfile__container">
        <h2 className="userProfile__container--title">
          Hello {updateProfile.firstName}!
        </h2>
        <form className="userProfile__container--form" onSubmit={handleSubmit}>
          <i className="userProfile__container--image">
            {!!updateProfile.photoUrl ? (
              <img
                src={updateProfile.photoUrl}
                alt="Profile"
                className="userProfile__container--profileImg"
              />
            ) : (
              <FaUserCircle className="userProfile__container--avatar" />
            )}
          </i>
          <label
            htmlFor="imageUpload"
            className="updateProfilePic userProfile__container--inputs"
          >
            Change profile picture
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            hidden
            onChange={handlePhoto}
          />
          <input
            type="text"
            name="firstName"
            // value="Pedro"
            placeholder="First name"
            className="userProfile__container--inputs"
            onChange={handleSubmit}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="userProfile__container--inputs"
            onChange={handleSubmit}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="userProfile__container--inputs"
            onChange={handleSubmit}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="userProfile__container--inputs"
            onChange={handleSubmit}
          />
          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone number"
            className="userProfile__container--inputs"
            onChange={handleSubmit}
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

export default Profile;
