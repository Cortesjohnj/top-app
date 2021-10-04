import { useEffect } from "react";
import { useParams } from "react-router";
import AdoptionRequest from "../components/AdoptionRequest";
import { useSelector, useDispatch } from "react-redux";
import { selectPet, updateRequest, bulkReject } from "../store/actionCreators";

import "../assets/styles/PetManagePage.css";

const PetManagePage = () => {
  const { id: petId } = useParams();
  const dispatch = useDispatch();

  //reading info
  useEffect(() => {
    dispatch(selectPet(petId));
  }, [dispatch, petId]);

  const pet = useSelector((state) => state.selectedPet);
  const requests = useSelector((state) => state.adoptionRequests) || [];

  // Updating a state
  const handleReject = (id) => () => {
    dispatch(updateRequest(petId, id, "rejected"));
  };

  const handleApprove = (id) => {
    dispatch(updateRequest(petId, id, "approved"));
    dispatch(bulkReject(petId, id));
  };

  return (
    <div className="background-container" data-testid="petManagePage">
      {!!pet.photoUrl ? (
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
      ) : (
        <h1 className="no-pets-message">This pet doesn't exist</h1>
      )}
    </div>
  );
};

export default PetManagePage;
