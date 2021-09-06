import React from 'react';
import Dog4 from '../../assets/images/security colored.svg';

const PetFormSuccess = () => {
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
    </div>
  );
};

export default PetFormSuccess;
