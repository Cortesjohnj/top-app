import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFoundation } from "../store/actionCreators";

const FoundationsImage = (props) => {
  const { id, photo_url, name, address, email, phone } = props;
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(
      setFoundation({
        id,
        photo_url,
        name,
        address,
        email,
        phone,
      }),
    );
  };
  return (
    <Link
      to={"/foundations/" + props.id + "/pets"}
      className="link-foundations"
      onClick={handleSubmit}
    >
      <figure className="photo-foundations" data-testid="foundationsCard">
        <img className="image-foundations" src={props.photo_url} alt="pet" />
        <h2 className="subtitle-foundations"> {props.name} </h2>
        <h2 className="text-foundations">
          {" "}
          {props.address} <br />
          {props.email} <br />
          {props.phone}{" "}
        </h2>
      </figure>
    </Link>
  );
};

export default FoundationsImage;
