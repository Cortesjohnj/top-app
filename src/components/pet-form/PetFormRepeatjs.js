import React from "react";
import { Link } from "react-router-dom";
import beWare from "../../assets/images/NoDog.svg";

function PetFormRepeat() {
  return (
    <div className="petform__successContainer">
      <h1 className="petform__successContainer--success">
        We have received your request!
      </h1>
      <object
        className="petform__successContainer--img"
        type="image/svg+xml"
        data={beWare}
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
}

export default PetFormRepeat;
