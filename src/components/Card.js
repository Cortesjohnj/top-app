import "../assets/styles/Card.css";
import { withRouter } from "react-router-dom";

const Card = (props) => {
  const { _id, name, description, photo_url, adopted } = props;

  const handleClick = () => {
    props.history.push("/request");
  };

  return (
    <div className="card-list-item">
      {adopted && (
        <div className="card-list-message">
          <p>Adopted</p>
        </div>
      )}
      <img className="card-list-item__image" src={photo_url} alt="Pet" />
      <div className="card-list-item__details" onClick={handleClick}>
        <h3 className="card-list-item__details--title">{name}</h3>
        <p className="card-list-item__details--text">{description}</p>
      </div>
    </div>
  );
};

export default withRouter(Card);
