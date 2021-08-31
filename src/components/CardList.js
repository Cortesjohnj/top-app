import "../assets/styles/CardList.css";

const CardList = ({ title, children }) => {
  return (
    <div className="card-list">
      <h1 className="card-list__title">{title}</h1>
      <div className="card-list__container">{children}</div>
    </div>
  );
};

export default CardList;
