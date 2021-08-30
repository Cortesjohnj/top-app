import "../assets/styles/Card.css";

const Card = (props) => {
  const { _id, name, description, photo_url } = props;
  return (
    <div className="card-list-item">
      <img className="card-list-item__image" src={photo_url} alt="Pet image" />
      <div className="card-list-item__details">
        <h3 className="card-list-item__details--title">{name}</h3>
        <p className="card-list-item__details--text">{description}</p>
      </div>
    </div>
  );
};

export default Card;
