import React from 'react';
import Slider from '../components/slider/Slider';
import '../assets/styles/Info.css';
import { SliderData } from './slider/SliderData';

function Info() {
  return (
    <div className="infoContainer">
      <div className="infoContainer__wrapper">
        <div className="infoContainer__wrapper--slider">
          <Slider
            className="infoContainer__wrapper--slides"
            slides={SliderData}
          />
        </div>
        <div className="infoContainer__wrapper--textWrapper">
          <div className="infoContainer__wrapper--topLine">
            Adopt your lifetime partner
          </div>
          <h1 className="infoContainer__wrapper--heading">
            Adopting is extremely easy
          </h1>
          <p className="infoContainer__wrapper--subtitle">
            If you love spending time with a companion for life join us. We link
            you with different foundations and pets that are waiting for you.
            All you need to do is add your information
          </p>
          {/* <div className="infoContainer__wrapper--btnWrap">
            <button className="infoContainer__wrapper--button" to="#">
              CONTACT US
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Info;
