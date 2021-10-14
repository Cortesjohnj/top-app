import FoundationsImage from "../components/FoundationsImage";
import customAxios from "../axios";
import { useState, useEffect } from "react";
import Home from "../pages/Home";

const FoundationsMenu = () => {
  const [foundations, setFoundations] = useState([]);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [page, setPage] = useState(1);
  const route = customAxios.defaults.baseURL + "/foundations?page=";
  const foundationsPerPage = 10;

  function NextPage(route, page) {
    customAxios
      .get(route + (page + 1))
      .then((response) => {
        setFoundations(response.data);
        if (response.data.length < foundationsPerPage) {
          setDisableNext(true);
        }
      })
      .catch((error) => setFoundations(null));
    setPage(page + 1);
    setDisablePrev(false);
  }

  function PreviousPage(route, page) {
    customAxios
      .get(route + (page - 1))
      .then((response) => setFoundations(response.data))
      .catch((error) => setFoundations(null));
    if (page - 1 === 1) setDisablePrev(true);
    setPage(page - 1);
    setDisableNext(false);
  }

  useEffect(() => {
    customAxios
      .get(route + page)
      .then((response) => {
        setFoundations(response.data);
        if (response.data && response.data.length < foundationsPerPage) {
          setDisableNext(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setFoundations(null);
      });
  }, [page, route]);

  if (foundations === null) {
    return <Home />;
  }

  return (
    <>
      <h1 className="title-foundations"> Foundations </h1>
      <div className="container-foundations ">
        {foundations.map((foundation) => (
          <FoundationsImage
            name={foundation.name}
            address={foundation.address}
            email={foundation.email}
            phone={foundation.phoneNumber}
            photo_url={foundation.photoUrl}
            id={foundation._id}
            key={foundation._id}
          ></FoundationsImage>
        ))}
      </div>
      <div className="container-buttons-foundations">
        <input
          type="submit"
          value="Previous"
          className="buttons-Foundation"
          disabled={disablePrev}
          onClick={() => {
            PreviousPage(route, page);
          }}
          data-testid="previousButton"
        />
        <input
          type="submit"
          value="Next"
          className="buttons-Foundation"
          disabled={disableNext}
          onClick={() => {
            NextPage(route, page);
          }}
          data-testid="nextButton"
        />
      </div>
    </>
  );
};

export default FoundationsMenu;
