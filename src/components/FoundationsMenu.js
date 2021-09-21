import FoundationsImage from "../components/FoundationsImage";
import customAxios from "../axios";
import { useState, useEffect } from "react";
import NotFound from "../pages/NotFound";

function NextPage(
  route,
  page,
  setPage,
  setFoundations,
  setDisableNext,
  setDisablePrev
) {
  customAxios
    .get(route + (page + 1))
    .then((response) => {
      setFoundations(response.data);
      if (response.data.length < 5) {
        setDisableNext(true);
      }
    })
    .catch((error) => setFoundations(null));
  setPage(page + 1);
  setDisablePrev(false);
}

function PreviousPage(
  route,
  page,
  setPage,
  setFoundations,
  setDisableNext,
  setDisablePrev
) {
  customAxios
    .get(route + (page - 1))
    .then((response) => setFoundations(response.data))
    .catch((error) => setFoundations(null));
  if (page - 1 === 1) setDisablePrev(true);
  setPage(page - 1);
  setDisableNext(false);
}

const FoundationsMenu = () => {
  const [foundations, setFoundations] = useState([]);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [page, setPage] = useState(1);
  const [route, setRoute] = useState(
    customAxios.defaults.baseURL + "/foundations?page="
  );

  useEffect(() => {
    customAxios
      .get(route + page)
      .then((response) => setFoundations(response.data))
      .catch((error) => {
        console.log(error);
        setFoundations(null);
      });
  }, []);

  if (foundations === null) {
    return <NotFound></NotFound>;
  }

  return (
    <>
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
          >
            {" "}
          </FoundationsImage>
        ))}{" "}
      </div>
      <div className="container-buttons-foundations">
        <input
          type="submit"
          value="Previous"
          className="buttons-Foundation"
          disabled={disablePrev}
          onClick={() => {
            PreviousPage(
              route,
              page,
              setPage,
              setFoundations,
              setDisableNext,
              setDisablePrev
            );
          }}
        />
        <input
          type="submit"
          value="Next"
          className="buttons-Foundation"
          disabled={disableNext}
          onClick={() => {
            NextPage(
              route,
              page,
              setPage,
              setFoundations,
              setDisableNext,
              setDisablePrev
            );
          }}
        />
      </div>
    </>
  );
};

export default FoundationsMenu;
