import React, { useState } from 'react';
import PetFormSignUp from './PetFormSignUp';
import PetFormSuccess from './PetFormSuccess';
import Dog3 from '../../assets/images/Dog newspaper-01.svg';
import '../../assets/styles/PetForm.css';
import { SliderData2 } from '../slider2/SliderData2';
import Slider2 from '../slider2/Slider2';

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm(e) {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className={isSubmitted ? 'petFormContainer2' : 'petFormContainer'}>
        {!isSubmitted ? (
          <>
            <div className="petFormContainer__content--left">
              <Slider2 slides2={SliderData2} />
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
