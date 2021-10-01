import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { listPets, listFoundationRequests } from "../store/actionCreators";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import PaginationButtons from "../components/PaginationButtons";
import history from "../history";

import "../assets/styles/PetListPage.css";

const PetListPage = () => {
  const { id: foundationId } = useParams();
  let redirectUrl = "";
  const dispatch = useDispatch();
  const { pets, petListInfo } = useSelector(state => state);
  const { user } = useSelector(state => state);

  useEffect(() => {
    dispatch(listPets(foundationId, 1));
    dispatch(listFoundationRequests(foundationId));
  }, [foundationId, dispatch]);

  const isFoundation = user.role === "foundation" && user._id === foundationId;

  isFoundation ? (redirectUrl = "/manage") : (redirectUrl = "/request");

  //List buttons
  let nextButton = false;
  let previousButton = false;

  petListInfo.page === 1 ? (previousButton = true) : (previousButton = false);
  petListInfo.page === Math.ceil(petListInfo.count / 10)
    ? (nextButton = true)
    : (nextButton = false);

  const handleNextPage = () => {
    dispatch(listPets(foundationId, petListInfo.page + 1));
    history.push({
      pathname: `/foundations/${foundationId}/pets`,
      search: `?page=${petListInfo.page + 1}`,
    });
  };

  const handlePreviousPage = () => {
    dispatch(listPets(foundationId, petListInfo.page - 1));
    history.push({
      pathname: `/foundations/${foundationId}/pets`,
      search: `?page=${petListInfo.page - 1}`,
    });
  };

  return (
    <div className="background-container">
      <CardList title="Are you looking for a new friend?">
        {pets.length > 0 ? (
          pets.map(item => (
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
      {petListInfo.count > 10 && (
        <PaginationButtons
          previousButton={previousButton}
          nextButton={nextButton}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
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
