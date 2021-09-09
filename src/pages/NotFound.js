import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/NotFound.css";
import Dog3 from "../assets/images/Error Naughty Dog.svg";

const NotFound = () => {
  return (
    <div className="notFound__container">
      <div className="notFound__container--wrapper">
        <div className="notFound__container--imageWrapper">
          <object
            className="notFound__container--image"
            type="image/svg+xml"
            data={Dog3}
          >
            svg-animation
          </object>
        </div>
        <div className="notFound__container--textWrapper">
          <h1 className="notFound__container--title">404 ERROR</h1>
          <p className="notFound__container--subtitle">
            The page you are looking for doesn't exist
          </p>
        </div>
        <Link className="notFound__container--btnWrapper" to="/">
          <button className="notFound__container--button">BACK TO HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
