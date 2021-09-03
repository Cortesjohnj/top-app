import "../assets/styles/AdoptionRequest.css";

const AdoptionRequest = ({ request, user_name, handleRequest }) => {
  return (
    <div className="request-container">
      <h2 className="request-container__name">{user_name}</h2>
      <div className="request-container__text">{request.description}</div>
      <div className="request-container__buttons">
        <button
          className="button-accept"
          onClick={handleRequest(request, "approved")}
        >
          Accept
        </button>
        <button
          className="button-reject"
          onClick={handleRequest(request, "rejected")}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdoptionRequest;
