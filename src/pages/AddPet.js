import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../assets/styles/AddPet.css";
import { PrimaryButton } from "../components/PrimaryButton";
import axios from "axios";

function AddPet() {
  const [pet, setPet] = useState({
    petName: "",
    petAge: "",
    petDescription: "",
    petPhotos: [],
  });
  const [counter, setCounter] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const fileInput = useRef(null);

  const handleOndragOver = event => {
    event.preventDefault();
  };

  const handleOndrop = event => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const fileArray = Array.from(event.dataTransfer.files).map(file =>
        URL.createObjectURL(file)
      );

      setSelectedImages(prevImages => prevImages.concat(fileArray));
      Array.from(event.dataTransfer.files).map(file =>
        URL.revokeObjectURL(file)
      );
    }

    let imageFile = event.dataTransfer.files;
    setPet(prevState => ({
      ...prevState,
      petPhotos: [...prevState.petPhotos, ...imageFile],
    }));
    setCounter(counter + imageFile.length);
  };

  const handleInputChange = event => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );

      setSelectedImages(prevImages => prevImages.concat(fileArray));
      Array.from(event.target.files).map(file => URL.revokeObjectURL(file));
    }

    let imageFile = event.target.files;
    setPet(prevState => ({
      ...prevState,
      petPhotos: [...prevState.petPhotos, ...imageFile],
    }));
    setCounter(counter + event.target.files.length);
  };

  const handleClick = event => {
    event.stopPropagation();
    fileInput.current.click();
  };

  const submit = event => {
    event.preventDefault();
    console.log(pet);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", pet)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const InputChange = event => {
    setPet({ ...pet, [event.target.name]: event.target.value });
  };

  return (
    <section className="registerPets">
      <div className="registerPets__container">
        <h2>Add Pet's</h2>
        <form onSubmit={submit}>
          <div
            className="container__dropzone"
            onDragOver={handleOndragOver}
            onDrop={handleOndrop}
            onClick={handleClick}
            multiple
          >
            <p>Click to select or drag and drop your Pet images here....</p>
            <i className="container__dropzone--uploadIcon">
              <FaCloudUploadAlt />
            </i>
          </div>
          <div className="container__dropzone--inputs">
            <h3>{`Images uploaded: ${counter}`}</h3>
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              name="file"
              multiple
              hidden
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="petName"
              id="name"
              placeholder="Pet's name"
              onChange={InputChange}
            />
            <input
              type="number"
              name="petAge"
              id="age"
              placeholder="Pet's age (Months)"
              onChange={InputChange}
            />
            <textarea
              rows="7"
              name="petDescription"
              id="description"
              placeholder="Write a pet's description"
              onChange={InputChange}
            />
            <PrimaryButton children={"Add Pet"} color={"azul"} />
          </div>
        </form>
        {selectedImages.map(photo => {
          return <img src={photo} key={photo} alt="" />;
        })}
      </div>
    </section>
  );
}

export { AddPet };
