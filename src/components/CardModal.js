import '../assets/styles/CardModal.css';

const CardModal = ({ handleOpenModal, name, id, handleDeletePet }) => {
  return (
    <div className="card-modal">
      <div className="class-modal__container">
        <p>Are you sure you want to delete pet {name}</p>
        <div className="class-modal__buttons">
          <button onClick={handleDeletePet(id)}>Confirm</button>
          <button onClick={handleOpenModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
