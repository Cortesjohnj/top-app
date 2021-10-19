import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Dog2 from "../assets/images/lf30_editor_wo8nkm2h.json";
import "../assets/styles/HelpUs.css";

const HelpUsSection = () => {
  const activeUser = useSelector((state) => state.user);

  return (
    <>
      <div className="joinUsContainer" id="helpUs">
        <div className="joinUsContainer__wrapper">
          <div className="joinUsContainer__wrapper--imgWrap">
            <Player autoplay loop src={Dog2} />
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
            {activeUser ? (
              <Link
                className="joinUsContainer__wrapper--btnWrap"
                to={
                  activeUser.role === "foundation"
                    ? `/foundations/${activeUser._id}/pets`
                    : "/foundations"
                }
              >
                <button className="joinUsContainer__wrapper--button">
                  {activeUser.role === "user" || activeUser.role === "admin"
                    ? "DONATE"
                    : "PETS"}
                </button>
              </Link>
            ) : (
              <Link className="joinUsContainer__wrapper--btnWrap" to="/login">
                <button className="joinUsContainer__wrapper--button">
                  DONATE
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpUsSection;
