import FoundationsImage from "../components/FoundationsImage"
import axios from "axios";
import React from "react"

const FoundationsMenu = () => {

  const [foundations, setFoundations] = React.useState([])
  React.useEffect(() => {
      axios.get("http://localhost:8080/foundations")
      .then(response => setFoundations(response.data))
      .catch(error => console.log(error))
  }, [])
  if (!foundations) return null
  return <div className= "container-foundations ">{ foundations.map(foundation => <FoundationsImage name={foundation.name} address={foundation.address}
      email={foundation.email} phone={foundation.phoneNumber} photo_url={foundation.photoUrl} id = {foundation._id} key= {foundation._id}> </FoundationsImage>)} </div>
}

export default FoundationsMenu