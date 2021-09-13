import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AddPet } from "./pages/AddPet";
import PetManagePage from "./pages/PetManagePage";
import { Suspense, useState } from "react";
import Spinner from "./components/Spinner";
import Foundations from "./pages/Foundations";
import Home from "./pages/Home";
import history from "./history";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <SideBar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/foundations/:id/pets" component={PetListPage} />
          <Route exact path="/pets/:id/request" />
          <Route exact path="/foundations/:id/add-pet" component={AddPet} />
          <Route exact path="/pets/:id/manage" component={PetManagePage} />
          <Route exact path="/foundations" component={Foundations} />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
