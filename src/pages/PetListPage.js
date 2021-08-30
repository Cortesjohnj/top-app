import CardList from "../components/CardList";
import Card from "../components/Card";

import MockData from "../MockData";

const PetListPage = () => {
  const { pets } = MockData;

  return (
    <CardList title="Are you looking for a new friend?">
      {pets.map((item) => (
        <Card key={item._id} {...item} />
      ))}
    </CardList>
  );
};

export default PetListPage;
