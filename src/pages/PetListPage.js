import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { listPets } from "../store/actionCreators";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import "../assets/styles/PetListPage.css";

const PetListPage = () => {
  const { id: foundationId } = useParams();
  let redirectUrl = "";
  const dispatch = useDispatch();
  const { pets, petListInfo } = useSelector((state) => state);

  useEffect(() => {
    dispatch(listPets(foundationId, 1));
  }, [foundationId, dispatch]);

  //This variables comes from the user session, I will set it manually for testing purposes
  const isFoundation = true;

  isFoundation ? (redirectUrl = "/manage") : (redirectUrl = "/request");

  //List buttons
  let nextButton = "";
  let previousButton = "";

  petListInfo.page === 1 ? (previousButton = true) : (previousButton = false);
  petListInfo.page === Math.ceil(petListInfo.count / 10)
    ? (nextButton = true)
    : (nextButton = false);

  const handleNextPage = () => {
    dispatch(listPets(foundationId, petListInfo.page + 1));
  };

  const handlePreviousPage = () => {
    dispatch(listPets(foundationId, petListInfo.page - 1));
  };

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
        ) : (
          <h1 className="no-pets-message">
            No pets available for this foundation
          </h1>
        )}
      </CardList>
      <div className="list-buttons">
        <button disabled={previousButton} onClick={handlePreviousPage}>
          Previous
        </button>
        <button disabled={nextButton} onClick={handleNextPage}>
          Next
        </button>
      </div>
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
