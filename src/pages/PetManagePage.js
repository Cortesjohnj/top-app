import { useParams } from "react-router";
import AdoptionRequest from "../components/AdoptionRequest";

import "../assets/styles/PetManagePage.css";

//Using MOckData for testing purposes
import MockData from "../MockData";

const PetManagePage = () => {
  const { id: pet_id } = useParams();

  //get info from MockData for testing purposes
  const pet = MockData.pets.filter((pet) => pet._id === +pet_id)[0];

  console.log(pet);

  return (
    <div>
      <section className="pet-info">
        <img className="pet-info__image" src={pet.photo_url} alt={pet.name} />
        <article className="pet-info__text">
          <h2>{pet.name}</h2>
          <p className="pet-info__text--label">
            <span>Age:</span> {pet.age}
          </p>
          <p className="pet-info__text--description">{pet.description}</p>
        </article>
      </section>
      <section className="requests-list">
        <AdoptionRequest></AdoptionRequest>
      </section>
    </div>
  );
};

export default PetManagePage;
