import React from "react";
import { Link } from "react-router-dom";
import Dog4 from "../../assets/images/security colored.svg";

const PetFormSuccess = () => {
  return (
    <div className="petform__successContainer">
      <h1 className="petform__successContainer--success">
        We have received your request!
      </h1>
      <object
        className="petform__successContainer--img"
        type="image/svg+xml"
        data={Dog4}
      >
        svg-animation
      </object>
      <Link to="/">
        <button className="petform__successContainer--button">
          RETURN TO HOME
        </button>
      </Link>
    </div>
  );
};

export default PetFormSuccess;
