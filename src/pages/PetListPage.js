import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import "../assets/styles/PetListPage.css";

import MockData from "../MockData";

const PetListPage = () => {
  const { pets } = MockData;
  const { id: foundation_id } = useParams();
  let redirectUrl = "";

  const [filteredPets, setFilteredPets] = useState([]);
  useEffect(() => {
    setFilteredPets(() =>
      pets.filter((item) => item.foundation_id === +foundation_id)
    );
  }, []);

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
          <Link to={`/foundations/${foundation_id}/add-pet`}>
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
