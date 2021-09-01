import { useState } from 'react';
import { withRouter } from 'react-router-dom';

import CardImage from './CardImage';

import '../assets/styles/PetCard.css';

const PetCard = (props) => {
  const { _id, name, description, photo_url, adopted, redirectUrl } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenImage = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    !adopted && props.history.push(`${redirectUrl}${_id}`);
  };

  return (
    <>
      <div className="card-list-item">
        {adopted && (
          <div className="card-list-message">
            <p>Adopted</p>
          </div>
        )}
        <img
          className="card-list-item__image"
          src={photo_url}
          alt="Pet"
          onClick={handleOpenImage}
          href={photo_url}
        />
        <div className="card-list-item__details" onClick={handleClick}>
          <h3 className="card-list-item__details--title">{name}</h3>
          <p className="card-list-item__details--text">{description}</p>
        </div>
      </div>
      {isOpen && (
        <CardImage photo_url={photo_url} handleOpenImage={handleOpenImage} />
      )}
    </>
  );
};

export default withRouter(PetCard);
