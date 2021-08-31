import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import CardImage from './CardImage';
import CardModal from './CardModal';

import '../assets/styles/PetCard.css';

const Card = (props) => {
  const {
    _id,
    name,
    description,
    photo_url,
    adopted,
    redirectUrl,
    isFoundation,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenImage = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
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
        {isFoundation && (
          <IconContext.Provider
            value={{
              color: 'red',
              className: 'delete-pets-container__icon',
            }}
          >
            <div className="delete-pets-container" onClick={handleOpenModal}>
              {' '}
              <FaMinus />
            </div>
          </IconContext.Provider>
        )}
      </div>
      {isOpen && (
        <CardImage photo_url={photo_url} handleOpenImage={handleOpenImage} />
      )}
      {modalIsOpen && (
        <CardModal photo_url={photo_url} handleOpenModal={handleOpenModal} />
      )}
    </>
  );
};

export default withRouter(Card);
