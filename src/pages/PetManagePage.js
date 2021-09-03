import { useParams } from "react-router";
import AdoptionRequest from "../components/AdoptionRequest";
import axios from "axios";

import "../assets/styles/PetManagePage.css";

//Using MOckData for testing purposes
import MockData from "../MockData";

const PetManagePage = () => {
  const { id: pet_id } = useParams();

  //get info from MockData for testing purposes
  const pet = MockData.pets.filter((pet) => pet._id === +pet_id)[0];
  const requests = MockData.adoptionRegistry.filter(
    (request) => request.pet_id === +pet_id
  );
  const users = requests.map(
    (request) =>
      MockData.users.filter((user) => user._id === request.user_id)[0]
  );

  //add axios logic
  const handleRequest = (request, state) => () => {
    axios
      .put("https://jsonplaceholder.typicode.com/posts/1", {
        request: { ...request, response_status: state },
      })
      .then(() => console.log("Updated succesfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="background-container">
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
        {requests.length > 0 &&
          requests.map((request, idx) => (
            <AdoptionRequest
              key={request._id}
              request={request}
              user_name={users[idx].name}
              handleRequest={handleRequest}
            ></AdoptionRequest>
          ))}
      </section>
    </div>
  );
};

export default PetManagePage;
