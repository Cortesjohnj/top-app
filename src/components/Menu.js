import Image from "../components/Image"
import MockData from "../MockData"

const Menu = () => {
  return <div className= "container-foundations ">{ MockData.foundations.map(foundation => <Image name={foundation.name} address={foundation.address}
      email={foundation.email} phone={foundation.phone_number} photo_url={foundation.photo_url} id = {foundation._id}> </Image>)} </div>
}

export default Menu;