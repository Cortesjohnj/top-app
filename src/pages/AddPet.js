import React, { useRef, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";

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
      console.log(fileArray);

      setSelectedImages(prevImages => prevImages.concat(fileArray));
      Array.from(event.dataTransfer.files).map(file =>
        URL.revokeObjectURL(file)
      );
    }

    let imageFile = event.dataTransfer.files;
    setPet(() => [...pet, imageFile]);
    setCounter(counter + imageFile.length);
  };

  const handleInputChange = event => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setSelectedImages(prevImages => prevImages.concat(fileArray));
      Array.from(event.target.files).map(file => URL.revokeObjectURL(file));
    }

    let imageFile = event.target.files;
    console.log(imageFile);

    setPet(() => [...pet, event.target.files]);

    setCounter(counter + event.target.files.length);
  };

  const handleClick = event => {
    event.stopPropagation();
    fileInput.current.click();
  };

  const submit = event => {
    event.preventDefault();
    console.log(pet);
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
            <i className="container__dropzone--uploadIcon"></i>
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
            <PrimaryButton name={"Add Pet"} color={"azul"} />
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
