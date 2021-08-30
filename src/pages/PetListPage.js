import CardList from "../components/CardList";
import PetCard from "../components/PetCard";

import MockData from "../MockData";

const PetListPage = () => {
  const { pets } = MockData;

  return (
    <CardList title="Are you looking for a new friend?">
      {pets.map((item) => (
        <PetCard key={item._id} {...item} />
      ))}
    </CardList>
  );
};

export default PetListPage;
