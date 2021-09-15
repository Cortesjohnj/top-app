import FoundationsImage from "../components/FoundationsImage"
import customAxios from "../axios"
import { useState, useEffect } from "react"

const FoundationsMenu = () => {
  const [foundations, setFoundations] = useState([])
  useEffect(() => {
    customAxios
      .get("http://localhost:8080/foundations")
      .then((response) => setFoundations(response.data))
      .catch((error) => setFoundations(null))
  }, [])

  if (foundations === null) {
    return (
      <p className="error-foundations">
        {" "}
        There is an unexpected error, please try again later{" "}
      </p>
    )
  }

  return (
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
  )
}

export default FoundationsMenu
