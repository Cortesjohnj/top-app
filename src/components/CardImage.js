import "../assets/styles/CardImage.css";

const CardImage = ({ photo_url, handleOpenImage }) => {
  return (
    <div className="card-image" onClick={handleOpenImage}>
      <img src={photo_url} alt="pet" />
    </div>
  );
};

export default CardImage;
