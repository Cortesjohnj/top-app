import { useState } from "react";

import CardModal from "./CardModal";

import "../assets/styles/AdoptionRequest.css";

const AdoptionRequest = ({ request, handleReject, handleApprove }) => {
  let classStatus = "";
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  request.responseStatus === "approved" && (classStatus = "status-green");

  request.responseStatus === "rejected" && (classStatus = "status-red");

  return (
    <>
      <div className="request-container" data-testid="requestCard">
        {!!request.userId.name ? (
          <h2 className="request-container__name">{request.userId.name}</h2>
        ) : (
          <h2 className="request-container__name">{request.petId.name}</h2>
        )}
        <div className="request-container__text">{request.description}</div>
        <div className="request-container__lower-text">
          <p>
            STATUS:{" "}
            <span className={classStatus}>{request.responseStatus}</span>
          </p>
          {handleApprove && (
            <div className="request-container__buttons">
              <button className="button-accept" onClick={handleOpenModal}>
                Approve
              </button>
              <button
                className="button-reject"
                onClick={handleReject(request._id)}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
      {modalIsOpen && (
        <CardModal
          handleOpenModal={handleOpenModal}
          id={request._id}
          handleConfirm={() => handleApprove(request._id)}
        >
          Are you sure you want to approve this request? This action can't be
          undone
        </CardModal>
      )}
    </>
  );
};

export default AdoptionRequest;
