import { useState } from "react";
import { withRouter } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";

import CardImage from "./CardImage";
import CardModal from "./CardModal";

//Testing with Mock Data
import MockData from "../MockData";

import "../assets/styles/PetCard.css";

const PetCard = (props) => {
  const {
    _id,
    name,
    description,
    photoUrl,
    adopted,
    redirectUrl,
    age,
    isFoundation,
  } = props;

  //Using Mock Data to test the number box
  const requests = MockData.adoptionRegistry.filter(
    (item) => item.pet_id === _id
  );

  const [isOpen, setIsOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenImage = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    !adopted && setModalIsOpen(!modalIsOpen);
  };

  const handleClick = () => {
    !adopted && props.history.push(`/pets/${_id}${redirectUrl}`);
  };

  const handleDeletePet = (_id) => {
    axios({
      method: "DELETE",
      baseURL: "https://jsonplaceholder.typicode.com",
      url: `/posts/1`,
      data: {
        id: _id,
      },
    })
      .then(() => {
        console.log("Pet deleted!");
      })
      .catch((error) => {
        console.dir(error.message);
      });
  };

  return (
    <>
      <div className="overflow--hidden">
        {isFoundation && requests.length > 0 && (
          <div className="card-list-number">
            <p>{requests.length}</p>
          </div>
        )}

        <div className="card-list-item">
          {adopted && (
            <div className="card-list-message">
              <p>Adopted</p>
            </div>
          )}
          <img
            className="card-list-item__image"
            src={photoUrl[0]}
            alt="Pet"
            onClick={handleOpenImage}
          />
          <div className="card-list-item__details" onClick={handleClick}>
            <h3 className="card-list-item__details--title">{name}</h3>
            <p className="card-list-item__details--text">
              <span>Age:</span> {age}
            </p>
            <p className="card-list-item__details--text">{description}</p>
          </div>
          {isFoundation && (
            <IconContext.Provider
              value={{
                color: "red",
                className: "delete-pets-container__icon",
              }}
            >
              <div className="delete-pets-container" onClick={handleOpenModal}>
                {" "}
                <FaMinus />
              </div>
            </IconContext.Provider>
          )}
        </div>
      </div>

      {isOpen && (
        <CardImage photo_url={photoUrl} handleOpenImage={handleOpenImage} />
      )}
      {modalIsOpen && (
        <CardModal
          handleOpenModal={handleOpenModal}
          id={_id}
          handleConfirm={handleDeletePet}
        >
          Are you sure you want to delete pet {name}
        </CardModal>
      )}
    </>
  );
};

export default withRouter(PetCard);
