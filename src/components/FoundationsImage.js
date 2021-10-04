import React from "react";
import { Link } from "react-router-dom";

const FoundationsImage = (props) => {
  return (
    <Link
      to={"/foundations/" + props.id + "/pets"}
      className="link-foundations"
    >
      <figure className="photo-foundations" data-testid="foundationsCard">
        <img className="image-foundations" src={props.photo_url} alt="pet" />
        <h2 className="subtitle-foundations"> {props.name} </h2>
        <h2 className="text-foundations">
          {" "}
          <b>Address</b>: {props.address} <br />
          <b>Email</b>: {props.email} <br />
          <b>Phone</b>: {props.phone}{" "}
        </h2>
      </figure>
    </Link>
  );
};

export default FoundationsImage;
