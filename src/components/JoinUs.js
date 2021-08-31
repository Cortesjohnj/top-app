import React from 'react';
import Dog2 from '../assets/images/undraw_good_doggy_4wfq.svg';
import '../assets/styles/JoinUs.css';

const JoinUsSection = () => {
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
              Adopting is extremely easy
            </h1>
            <p className="joinUsContainer__wrapper--subtitle">
              If you love spending time with a companion for life join us. We
              link you with different foundations and pets that are waiting for
              you. All you need to do is add your information
            </p>
            <div className="joinUsContainer__wrapper--btnWrap">
              <button className="joinUsContainer__wrapper--button" to="home">
                JOIN US
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinUsSection;
