import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import CardList from '../components/CardList';
import PetCard from '../components/PetCard';
import '../assets/styles/PetListPage.css';

import MockData from '../MockData';

const PetListPage = () => {
  const { pets } = MockData;
  const { id: foundation_id } = useParams();
  const filteredPets = pets.filter(
    (item) => item.foundation_id === +foundation_id
  );
  const isFoundation = true;

  return (
    <>
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
      {isFoundation && (
        <IconContext.Provider
          value={{
            color: 'var(--blue-pigment)',
            className: 'add-pets-icon__icon',
          }}
        >
          <Link to={`foundation/${foundation_id}/new-pet`}>
            <div className="add-pets-icon">
              {' '}
              <FaPlusCircle className="add-pets-icon__icon" />
            </div>
          </Link>
        </IconContext.Provider>
      )}
    </>
  );
};

export default PetListPage;
