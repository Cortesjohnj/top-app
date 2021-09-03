import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AdoptionRequest from "../components/AdoptionRequest";
import axios from "axios";

import "../assets/styles/PetManagePage.css";

//Using MOckData for testing purposes
import MockData from "../MockData";

const PetManagePage = () => {
  const { id: pet_id } = useParams();
  const [state, setState] = useState({
    requests: [],
    users: [],
  });

  //////////////////////get info from MockData for testing purposes
  const pet = MockData.pets.filter((pet) => pet._id === +pet_id)[0];

  useEffect(() => {
    const requests = MockData.adoptionRegistry.filter(
      (req) => req.pet_id === +pet_id
    );
    setState((state) => {
      return {
        ...state,
        requests: requests || {},
      };
    });

    setState((state) => {
      return {
        ...state,
        users: state.requests.map(
          (request) =>
            MockData.users.filter((user) => user._id === request.user_id)[0] ||
            {}
        ),
      };
    });
  }, []);

  const handleRequest = (request, status) => () => {
    return setState((state) => ({
      ...state,
      requests: state.requests.map((r) =>
        r._id === +request._id ? { ...request, response_status: status } : r
      ),
    }));
  };

  //////////////////////add axios logic
  //reading info
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => setRequests(response.data))
  //   .catch((err) => console.log(err))
  // }, [])

  //Updating a state
  // const handleRequest = (request, state) => () => {
  //   axios
  //     .put("https://jsonplaceholder.typicode.com/posts/1", {
  //       request: { ...request, response_status: state },
  //     })
  //     .then(() => console.log("Updated succesfully"))
  //     .catch((err) => console.log(err));
  // };

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
        {state.requests.length > 0 &&
          state.requests.map((req, idx) => (
            <AdoptionRequest
              key={req._id}
              request={req}
              user_name={state.users[idx].name}
              handleRequest={handleRequest}
            ></AdoptionRequest>
          ))}
      </section>
    </div>
  );
};

export default PetManagePage;
