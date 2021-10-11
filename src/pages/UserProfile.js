import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/UserProfile.css";
import { PrimaryButton } from "../components/PrimaryButton";
import { listUserRequests, updateUserProfile } from "../store/actionCreators";
import AdoptionRequest from "../components/AdoptionRequest";

function Profile() {
  const { name, email, address, phoneNumber, _id, role, photoUrl } =
    useSelector(state => state.user);
  const dispatch = useDispatch();

  const [updateProfile, setUpdateProfile] = useState({
    _id,
    name,
    email,
    address,
    phoneNumber,
    photoUrl,
    role,
    imageFile: null,
  });

  useEffect(() => {
    dispatch(listUserRequests(_id));
  }, [_id, dispatch]);

  const requests = useSelector(state => state.userRequests) || [];

  const cleanup = () => {
    URL.revokeObjectURL(updateProfile);
  };

  const setImage = newImage => {
    if (updateProfile) {
      cleanup();
    }
    setUpdateProfile(prevState => ({
      ...prevState,
      photoUrl: URL.createObjectURL(newImage),
      imageFile: newImage,
    }));
  };

  const handlePhoto = event => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImage(newImage);
    }
  };

  const onChange = event => {
    event.preventDefault();
    setUpdateProfile(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateUserProfile(updateProfile));
  };

  return (
    <section className="userProfile">
      <div className="userProfile__container">
        <h2 className="userProfile__container--title">Hello {name}!</h2>
        <form
          className="userProfile__container--form"
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
            name="imageUpload"
            accept="image/*"
            hidden
            onChange={handlePhoto}
            data-testid="imageUpload"
          />
          <input
            id="name"
            type="text"
            name="name"
            placeholder={name || "Name"}
            className="userProfile__container--inputs"
            onChange={onChange}
            required={name ? true : false}
            value={updateProfile.name}
            data-testid="name"
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled
            className="userProfile__container--inputs"
          />
          <input
            id="address"
            type="text"
            name="address"
            placeholder={address || "Address"}
            className="userProfile__container--inputs"
            onChange={onChange}
            required={address ? true : false}
            value={updateProfile.address}
            data-testid="address"
          />
          <input
            id="phoneNumber"
            type="number"
            name="phoneNumber"
            placeholder={phoneNumber || "Phone Number"}
            className="userProfile__container--inputs"
            onChange={onChange}
            required={phoneNumber ? true : false}
            value={updateProfile.phoneNumber}
            data-testid="phoneNumber"
          />
          <PrimaryButton
            children={"Update profile"}
            color={"primaryButton updateUser"}
          />
        </form>
      </div>
      {requests.length > 0 && (
        <>
          <h2 className="request-title">Adoption Requests</h2>
          <section className="requests-list">
            {requests.map(req => (
              <AdoptionRequest
                key={req._id}
                request={req}
                handleReject={null}
                handleApprove={null}
              ></AdoptionRequest>
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default Profile;
