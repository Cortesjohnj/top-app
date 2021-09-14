import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AdoptionRequest from "../components/AdoptionRequest";
import { useSelector, useDispatch } from "react-redux";
import { selectPet } from "../store/actionCreators";

import "../assets/styles/PetManagePage.css";

//Using MOckData for testing purposes
import MockData from "../MockData";

const PetManagePage = () => {
  const { id: petId } = useParams();
  const [state, setState] = useState({
    requests: [],
    users: [],
  });
  const dispatch = useDispatch();

  //////////////////////get info from MockData for testing purposes
  //const pet = MockData.pets.filter((pet) => pet._id === +petId)[0];

  // useEffect(() => {
  //   console.log(`pet id: ${petId}`);
  //   const requests = MockData.adoptionRegistry.filter(
  //     (req) => req.pet_id === +petId
  //   );

  //   setState((state) => {
  //     return {
  //       ...state,
  //       requests: requests || {},
  //       users: requests.map(
  //         (request) =>
  //           MockData.users.filter((user) => user._id === request.user_id)[0] ||
  //           {}
  //       ),
  //     };
  //   });
  // }, [petId]);

  const handleReject = (id) => () => {
    return setState((state) => ({
      ...state,
      requests: state.requests.map((r) =>
        r._id === +id ? { ...r, response_status: "rejected" } : r
      ),
    }));
  };

  const handleApprove = (id) => {
    return setState((state) => ({
      ...state,
      requests: state.requests.map((r) =>
        r._id === +id
          ? { ...r, response_status: "approved" }
          : { ...r, response_status: "rejected" }
      ),
    }));
  };

  //////////////////////add axios logic
  //reading info
  useEffect(() => {
    dispatch(selectPet(petId));
  }, [dispatch, petId]);

  const pet = useSelector((state) => state.selectedPet);
  const requests = useSelector((state) => state.adoptionRequests) || [];

  // Updating a state
  // const handleReject = (id) => {
  //   axios
  //     .put("https://jsonplaceholder.typicode.com/posts/1", {
  //       request: { ...request, response_status: 'rejected' },
  //     })
  //     .then(() => {
  //       console.log("Updated succesfully");
  //       setState((state) => ({
  //         ...state,
  //         requests: state.requests.map((r) =>
  //           r._id === +id ? { ...r, response_status: "rejected" } : r
  //         ),
  //       }));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleApprove = (id) => {
  //   axios
  //     .put("https://jsonplaceholder.typicode.com/posts/1", {
  //       request: { ...request, response_status: "approved" },
  //     })
  //     .then(() => {
  //       console.log("Updated succesfully");
  //       setState((state) => ({
  //         ...state,
  //         requests: state.requests.map((r) =>
  //           r._id === +id
  //             ? { ...r, response_status: "approved" }
  //             : { ...r, response_status: "rejected" }
  //         ),
  //       }));
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="background-container">
      {!!pet.photoUrl && (
        <>
          <section className="pet-info">
            <img
              className="pet-info__image"
              src={pet.photoUrl[0]}
              alt={pet.name}
            />
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
              requests.map((req, idx) => (
                <AdoptionRequest
                  key={req._id}
                  request={req}
                  handleReject={handleReject}
                  handleApprove={handleApprove}
                ></AdoptionRequest>
              ))}
          </section>
        </>
      )}
    </div>
  );
};

export default PetManagePage;
