import { useEffect } from "react";
import { useParams, useLocation } from "react-router";
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
  const loading = petListInfo.page ? false : true;
  const initPage =
    useLocation().search.slice(useLocation().search.indexOf("=") + 1) || 1;

  //initial loading for pets and requests
  useEffect(() => {
    dispatch(listPets(foundationId, initPage));
    dispatch(listFoundationRequests(foundationId));
  }, [foundationId, dispatch, initPage]);

  //checking the role and the id to show or hide some buttons and select som redirects
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
      {!loading && (
        <>
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
              <h1 className="no-pets-message" data-testid="noPetsFoundation">
                You don't have any pets registered
              </h1>
            ) : (
              <h1 className="no-pets-message" data-testid="noPetsUser">
                No pets available for this foundation
              </h1>
            )}
          </CardList>
        </>
      )}
      {petListInfo.count > 10 && (
        <PaginationButtons
          previousButton={previousButton}
          nextButton={nextButton}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
      {isFoundation ? (
        <IconContext.Provider
          value={{
            color: "var(--blue-pigment)",
            className: "add-pets-container__icon",
          }}
        >
          <Link to={`/foundations/${foundationId}/add-pet`}>
            <div className="add-pets-container" data-testid="addPetButton">
              {" "}
              <FaPlusCircle />
            </div>
          </Link>
        </IconContext.Provider>
      ) : (
        <Link
          to={`/foundations/${foundationId}/donate`}
          className="add-pets-container donate-button"
        >
          Donate
        </Link>
      )}
    </div>
  );
};

export default PetListPage;
