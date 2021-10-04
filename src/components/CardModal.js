import "../assets/styles/CardModal.css";

const CardModal = ({ handleOpenModal, id, handleConfirm, children }) => {
  return (
    <div className="card-modal" data-testid="deletePetModal">
      <div className="class-modal__container">
        <p>{children}</p>
        <div className="class-modal__buttons">
          <button
            onClick={() => {
              handleConfirm(id);
              handleOpenModal();
            }}
          >
            Confirm
          </button>
          <button onClick={handleOpenModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
