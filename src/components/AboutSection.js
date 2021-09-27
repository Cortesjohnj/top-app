import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dog from "../assets/images/Dog swimming-01.svg";
import "../assets/styles/AboutSection.css";

const AboutSection = () => {
  const activeUser = useSelector((state) => state.user);
  return (
    <>
      <div className="aboutContainer">
        <div className="aboutContainer__wrapper">
          <div className="aboutContainer__wrapper--textWrapper">
            <div className="aboutContainer__wrapper--topLine">
              Adopt your lifetime partner
            </div>
            <h1 className="aboutContainer__wrapper--heading">
              Adopting is extremely easy
            </h1>
            <p className="aboutContainer__wrapper--subtitle">
              If you love spending time with a companion for life join us. We
              link you with different foundations and pets that are waiting for
              you. All you need to do is add your information
            </p>
            {activeUser ? (
              <Link
                className="aboutContainer__wrapper--btnWrap"
                to={
                  activeUser.role === "user" || activeUser.role === "admin"
                    ? "/foundations"
                    : `/foundations/${activeUser._id}/pets`
                }
              >
                <button className="aboutContainer__wrapper--button">
                  {activeUser.role === "user" || activeUser.role === "admin"
                    ? "FOUNDATIONS"
                    : "PETS"}
                </button>
              </Link>
            ) : (
              <Link className="aboutContainer__wrapper--btnWrap" to="/signup">
                <button className="aboutContainer__wrapper--button">
                  ADOPT ME
                </button>
              </Link>
            )}
          </div>

          <div className="aboutContainer__wrapper--imgWrap">
            <object
              className="aboutContainer__wrapper--img"
              type="image/svg+xml"
              data={Dog}
            >
              svg-animation
            </object>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
