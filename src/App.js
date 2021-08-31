import "./App.css"
import MockData from "./MockData"
import { useState } from "react";


const Image = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    const handleOpenImage = () => {
        setIsOpen(!isOpen);
      };
    return <figure className="photo" >
      <img className="image" src={props.photo_url} alt="pet" onClick= {handleOpenImage} />
      <h1 className="title"> {props.name} </h1>
          <figcaption className="text"> <b>Dirección</b>: {props.address} <br/><b>Email</b>: {props.email} <br/>
            <b>Teléfono</b>: {props.phone} </figcaption>
       </figure>
}

const Menu = () =>{
  let rows = []
  for (let i = 0; i < MockData.foundations.length; i++){
    let foundation = MockData.foundations[i]
    rows.push(  <Image name={foundation.name} address={foundation.address}
      email={foundation.email} phone={foundation.phone_number} photo_url={foundation.photo_url}> </Image>)
    
  }
  return <div className= "container">{rows} </div>
}

const App = () => {
  return (
    <div className="App">
        <Menu />
    </div>
  )
}

export default App;
