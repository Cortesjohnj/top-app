import React from 'react';
import Dog2 from '../assets/images/undraw_good_doggy_4wfq.svg';
import '../assets/styles/HelpUs.css';

const HelpUsSection = () => {
  return (
    <>
      <div className="joinUsContainer">
        <div className="joinUsContainer__wrapper">
          <div className="joinUsContainer__wrapper--imgWrap">
            <object
              className="joinUsContainer__wrapper--img"
              type="image/svg+xml"
              data={Dog2}
            >
              svg-animation
            </object>
          </div>
          <div className="joinUsContainer__wrapper--textWrapper">
            <div className="joinUsContainer__wrapper--topLine">
              Adopt your lifetime partner
            </div>
            <h1 className="joinUsContainer__wrapper--heading">
              You can help our foundations
            </h1>
            <p className="joinUsContainer__wrapper--subtitle">
              If you aren't interested inm adopting a pet, you can hel the
              foundations maintain their herd with a donation.
            </p>
            <div className="joinUsContainer__wrapper--btnWrap">
              <button className="joinUsContainer__wrapper--button" to="home">
                DONATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpUsSection;
