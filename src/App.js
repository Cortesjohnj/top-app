import "./App.css"
import MockData from "./MockData"
import {BrowserRouter, Link} from 'react-router-dom'

const Image = (props) => {
  return <Link to={"/foundations/:" + props.id + "/pets"} className = "link">
          <figure className="photo">
          <img className="image" src={props.photo_url} alt="pet" />
          <h2 className="title"> {props.name} </h2>
          <h2 className="text"> <b>Dirección</b>: {props.address} <br/><b>Email</b>: {props.email} <br/>
          <b>Teléfono</b>: {props.phone} </h2>
          </figure>
      </Link>
}

const Menu = () => {
  const rows = MockData.foundations.map(foundation => <Image name={foundation.name} address={foundation.address}
      email={foundation.email} phone={foundation.phone_number} photo_url={foundation.photo_url} id = {foundation._id}> </Image>)
  return <div className= "container">{rows} </div>
}

function App( ) {
  return (
    <BrowserRouter>
        <h1 className= "main-title"> Fundaciones </h1>
        <Menu />
    </BrowserRouter>
  )
}

export default App;
