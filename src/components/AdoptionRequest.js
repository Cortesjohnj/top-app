import "../assets/styles/AdoptionRequest.css";

const AdoptionRequest = ({ request, user_name, handleRequest }) => {
  let classStatus = "";
  request.response_status === "approved" && (classStatus = "status-green");

  request.response_status === "rejected" && (classStatus = "status-red");

  return (
    <div className="request-container">
      <h2 className="request-container__name">{user_name}</h2>
      <div className="request-container__text">{request.description}</div>
      <div className="request-container__lower-text">
        <p>
          STATUS: <span className={classStatus}>{request.response_status}</span>
        </p>
        <div className="request-container__buttons">
          <button
            className="button-accept"
            onClick={handleRequest(request, "approved")}
          >
            Approve
          </button>
          <button
            className="button-reject"
            onClick={handleRequest(request, "rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequest;
