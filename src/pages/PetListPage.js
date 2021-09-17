import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { listPets, listFoundationRequests } from "../store/actionCreators";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import "../assets/styles/PetListPage.css";

const PetListPage = () => {
  const { id: foundationId } = useParams();
  let redirectUrl = "";
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(listPets(foundationId));
    dispatch(listFoundationRequests(foundationId));
  }, [foundationId, dispatch]);

  const isFoundation = user.role === "foundation" && user._id === foundationId;

  isFoundation ? (redirectUrl = "/manage") : (redirectUrl = "/request");

  return (
    <div className="background-container">
      <CardList title="Are you looking for a new friend?">
        {pets.length > 0 ? (
          pets.map((item) => (
            <PetCard
              key={item._id}
              {...item}
              redirectUrl={redirectUrl}
              isFoundation={isFoundation}
            />
          ))
        ) : isFoundation ? (
          <h1 className="no-pets-message">
            You don't have any pets registered
          </h1>
        ) : (
          <h1 className="no-pets-message">
            No pets available for this foundation
          </h1>
        )}
      </CardList>
      {isFoundation && (
        <IconContext.Provider
          value={{
            color: "var(--blue-pigment)",
            className: "add-pets-container__icon",
          }}
        >
          <Link to={`/foundations/${foundationId}/add-pet`}>
            <div className="add-pets-container">
              {" "}
              <FaPlusCircle />
            </div>
          </Link>
        </IconContext.Provider>
      )}
    </div>
  );
};

export default PetListPage;
