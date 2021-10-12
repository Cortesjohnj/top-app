import React from "react";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import beWare from "../../assets/images/29407-warning-icon.json";

function PetFormRepeat() {
  return (
    <div className="petform__successContainer">
      <h1 className="petform__successContainer--success">
        You have already sent a request to adopt this pet
      </h1>
      <Player
        className="petform__successContainer--img"
        autoplay
        loop
        src={beWare}
      />
      <Link to="/">
        <button className="petform__successContainer--button">
          RETURN TO HOME
        </button>
      </Link>
    </div>
  );
}

export default PetFormRepeat;
