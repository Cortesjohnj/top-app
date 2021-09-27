import React from "react";
import "../assets/styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinnerContainer__text">
        <h1 className="spinnerContainer__text--h1">Loading...</h1>
      </div>
      <div className="spinnerContainer__spinnerWrapper">
        <div className="spinnerContainer__spinnerWrapper--spinner1"></div>
        <div className="spinnerContainer__spinnerWrapper--spinner2"></div>
      </div>
    </div>
  );
};

export default Spinner;
