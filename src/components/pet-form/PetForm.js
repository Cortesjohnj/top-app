import React, { useState } from 'react';
import PetFormSignUp from './PetFormSignUp';
import PetFormSuccess from './PetFormSuccess';
import Dog3 from '../../assets/images/Dog newspaper-01.svg';
import '../../assets/styles/PetForm.css';

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className={isSubmitted ? 'petFormContainer2' : 'petFormContainer'}>
        {!isSubmitted ? (
          <>
            <div className="petFormContainer__content--left">
              <object
                className="petFormContainer__img"
                type="image/svg+xml"
                data={Dog3}
              >
                svg-animation
              </object>
            </div>
            <PetFormSignUp submitForm={submitForm} />
          </>
        ) : (
          <PetFormSuccess />
        )}
      </div>
    </>
  );
};

export default PetForm;
