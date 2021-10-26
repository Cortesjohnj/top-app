import React, { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../assets/styles/AddPet.css";
import { PrimaryButton } from "../components/PrimaryButton";
import { addPets, resetError } from "../store/actionCreators";

function AddPet() {
  const { id: foundationId } = useParams();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const [pet, setPet] = useState({
    petName: "",
    petAge: "",
    petDescription: "",
    photoUrl: [],
    foundationId: foundationId,
    error: {
      petName: false,
      petAge: false,
      petDescription: false,
    },
  });

  const [counter, setCounter] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const fileInput = useRef(null);

  const handleOndragOver = (event) => {
    event.preventDefault();
  };

  const handleOndrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const fileArray = Array.from(event.dataTransfer.files).map((file) =>
        URL.createObjectURL(file),
      );

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.dataTransfer.files).map((file) =>
        URL.revokeObjectURL(file),
      );
    }

    let imageFile = event.dataTransfer.files;
    setPet((prevState) => ({
      ...prevState,
      photoUrl: [...prevState.photoUrl, ...imageFile],
    }));
    setCounter(counter + imageFile.length);
  };

  const handleInputChange = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }

    let imageFile = event.target.files;
    setPet((prevState) => ({
      ...prevState,
      photoUrl: [...prevState.photoUrl, ...imageFile],
    }));
    setCounter(counter + event.target.files.length);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    fileInput.current.click();
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(addPets(pet));
  };

  const validator = (event) => {
    const validate = /^\s*$/.test(event.target.value);
    setPet((prevState) => ({
      ...prevState,
      error: { ...prevState.error, [event.target.name]: validate },
    }));
  };

  const InputChange = (event) => {
    setPet({ ...pet, [event.target.name]: event.target.value });
  };

  return (
    <section className="registerPets">
      <div className="registerPets__container">
        <h2 className="registerPets__container--title">Add Pet's</h2>
        <form onSubmit={submit} data-testid="form">
          <div
            className="container__dropzone"
            onDragOver={handleOndragOver}
            onDrop={handleOndrop}
            onClick={handleClick}
            multiple
          >
            <p className="container__dropzone--text">
              Click to select or drag and drop your Pet images here....
            </p>
            <i className="container__dropzone--uploadIcon">
              <FaCloudUploadAlt />
            </i>
          </div>
          <div className="container__dropzone--inputs">
            <h3 className="container__dropzone--counter">{`Images uploaded: ${counter}`}</h3>
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              name="file"
              multiple
              hidden
              className="container__dropzone--input"
              onChange={handleInputChange}
            />
            {pet.error.petName && (
              <span className="container__dropzone--inputsErrors">
                *Please enter a name for your pet
              </span>
            )}
            <input
              type="text"
              name="petName"
              id="name"
              placeholder="Pet's name"
              data-testid="name"
              onChange={InputChange}
              onBlur={validator}
              className="container__dropzone--input"
            />
            {pet.error.petAge && (
              <span className="container__dropzone--inputsErrors">
                *Please enter an age for your pet
              </span>
            )}
            <input
              type="number"
              name="petAge"
              id="age"
              min="0"
              placeholder="Pet's age (Months)"
              data-testid="age"
              onChange={InputChange}
              onBlur={validator}
              className="container__dropzone--input"
            />
            {pet.error.petDescription && (
              <span className="container__dropzone--inputsErrors">
                *Please enter a description for your pet
              </span>
            )}
            <textarea
              rows="7"
              name="petDescription"
              id="description"
              placeholder="Write a pet's description"
              data-testid="description"
              onChange={InputChange}
              onBlur={validator}
              className="container__dropzone--textArea"
            />
            {!!error && (
              <span className="container__dropzone--inputsErrors">{error}</span>
            )}
            <div className="addButton">
              <PrimaryButton
                children={"Add Pet"}
                color={"primaryButton addPets"}
              />
            </div>
          </div>
        </form>
        {selectedImages.map((photo) => {
          return (
            <img
              className="registerPets__container--photos"
              src={photo}
              key={photo}
              alt=""
            />
          );
        })}
      </div>
    </section>
  );
}

export default AddPet;
