import FoundationsImage from "../components/FoundationsImage"
import MockData from "../MockData"

const FoundationsMenu = () => {
  return <div className= "container-foundations ">{ MockData.foundations.map(foundation => <FoundationsImage name={foundation.name} address={foundation.address}
      email={foundation.email} phone={foundation.phone_number} photo_url={foundation.photo_url} id = {foundation._id}> </FoundationsImage>)} </div>
}

export default FoundationsMenu;