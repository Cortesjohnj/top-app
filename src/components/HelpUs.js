import React from "react";
import { Link } from "react-router-dom";
import Dog2 from "../assets/images/undraw_good_doggy_4wfq.svg";
import "../assets/styles/HelpUs.css";

const HelpUsSection = () => {
  return (
    <>
      <div className="joinUsContainer" id="helpUs">
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
              If you aren't interested in adopting a pet, you can help the
              foundations maintain their herd with a donation.
            </p>
            <Link className="joinUsContainer__wrapper--btnWrap" to="/donate">
              <button className="joinUsContainer__wrapper--button">
                DONATE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpUsSection;
