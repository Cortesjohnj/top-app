import "../assets/styles/PaginationButtons.css";

const PaginationButtons = ({
  previousButton,
  nextButton,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="list-buttons">
      <button disabled={previousButton} onClick={handlePreviousPage}>
        Previous
      </button>
      <button disabled={nextButton} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
