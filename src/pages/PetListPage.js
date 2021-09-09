import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredPets } from "../actions";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import "../assets/styles/PetListPage.css";

const PetListPage = () => {
  const { id: foundationId } = useParams();
  let redirectUrl = "";
  const dispatch = useDispatch();
  const { filteredPets } = useSelector((state) => state);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`/foundations/${foundationId}/pets`);
        //setFilteredPets(response.data);
        dispatch(setFilteredPets(response.data));
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [foundationId, dispatch]);

  //This variables comes from the user session, I will set it manually for testing purposes
  const isFoundation = true;

  isFoundation ? (redirectUrl = "/manage") : (redirectUrl = "/request");

  return (
    <div className="background-container">
      <CardList title="Are you looking for a new friend?">
        {filteredPets.length > 0 ? (
          filteredPets.map((item) => (
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
