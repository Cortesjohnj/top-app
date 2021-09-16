import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/UserProfile.css";
import { PrimaryButton } from "../components/PrimaryButton";
import { updateUserProfile } from "../store/actionCreators";

function Profile() {
  const { name, email, address, phoneNumber, _id, role } = useSelector(
    state => state.user
  );

  // console.log(name, email, address, phoneNumber, _id);

  const dispatch = useDispatch();

  const [updateProfile, setUpdateProfile] = useState({
    _id: _id,
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    photoUrl: null,
    role: role,
  });

  // const cleanup = () => {
  //   URL.revokeObjectURL(updateProfile);
  // };

  // const setImage = newImage => {
  //   if (updateProfile) {
  //     cleanup();
  //   }
  //   setUpdateProfile(prevState => ({
  //     ...prevState,
  //     photoUrl: newImage,
  //   }));
  // };

  // const handlePhoto = event => {
  //   const newImage = event.target.files[0];
  //   if (newImage) {
  //     setImage(URL.createObjectURL(newImage));
  //   }
  // };

  const onChange = event => {
    event.preventDefault();
    setUpdateProfile(prevState => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(updateUserProfile(updateProfile));
    // setUpdateProfile(prevState => ({
    //   ...prevState,
    //   [event.target.name]: event.target.value,
    // }));
  };

  return (
    <section className="userProfile">
      <div className="userProfile__container">
        <h2 className="userProfile__container--title">Hello {name}!</h2>
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
            // onChange={handlePhoto}
          />
          <input
            type="text"
            name="name"
            // value={name}
            placeholder={name}
            className="userProfile__container--inputs"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled
            className="userProfile__container--inputs"
            // onChange={handleSubmit}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            className="userProfile__container--inputs"
            // onChange={handleSubmit}
          />
          <input
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Phone number"
            className="userProfile__container--inputs"
            // onChange={handleSubmit}
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
