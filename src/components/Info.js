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
            We connect you with your dream pet
          </div>
          <h1 className="infoContainer__wrapper--heading">
            Just select a foundation, then select your favorite pet and you´re
            ready to start the adoption process.
          </h1>
          <p className="infoContainer__wrapper--subtitle">
            Your dream pet is waiting for you
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
