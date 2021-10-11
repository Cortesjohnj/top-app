import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Dog from "../assets/images/23919-error-doggy.json";

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
                  activeUser.role === "user"
                    ? "/foundations"
                    : activeUser.role === "foundation"
                    ? `/foundations/${activeUser._id}/pets`
                    : activeUser.role === "admin" &&
                      `/${activeUser._id}/profile`
                }
              >
                <button className="aboutContainer__wrapper--button">
                  {activeUser.role === "user"
                    ? "FOUNDATIONS"
                    : activeUser.role === "foundation"
                    ? "PETS"
                    : activeUser.role === "admin" && "PROFILE"}
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
            <Player autoplay loop src={Dog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
