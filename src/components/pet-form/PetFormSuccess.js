import React from 'react';
import { useHistory } from 'react-router-dom';
import Dog4 from '../../assets/images/security colored.svg';

const PetFormSuccess = () => {
  const history = useHistory();

  return (
    <div className="petform__successContainer">
      <h1 className="petform__successContainer--success">
        We have received your request!
      </h1>
      <object
        className="petform__successContainer--img"
        type="image/svg+xml"
        data={Dog4}
      >
        svg-animation
      </object>
      <button
        className="petform__successContainer--button"
        // onClick={history.push('/:id/profile')}
      >
        RETURN TO HOME
      </button>
    </div>
  );
};

export default PetFormSuccess;
