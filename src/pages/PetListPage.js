import { useParams } from "react-router";

import CardList from "../components/CardList";
import PetCard from "../components/PetCard";
import "../assets/styles/PetListPage.css";

import MockData from "../MockData";

const PetListPage = () => {
  const { pets } = MockData;
  const { id: foundation_id } = useParams();
  const filteredPets = pets.filter(
    (item) => item.foundation_id === +foundation_id
  );
  return (
    <CardList title="Are you looking for a new friend?">
      {filteredPets.length > 0 ? (
        filteredPets.map((item) => (
          <PetCard key={item._id} {...item} redirectUrl="/request/" />
        ))
      ) : (
        <h1 className="no-pets-message">
          No pets available for this foundation
        </h1>
      )}
    </CardList>
  );
};

export default PetListPage;
