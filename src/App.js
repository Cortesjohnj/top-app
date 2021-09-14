import { Router, Switch, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import history from "./history";
import { useDispatch } from "react-redux";
import { ISUSER } from "./store/actions";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const PetListPage = lazy(() => import("./pages/PetListPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AddPet = lazy(() => import("./pages/AddPet"));
const PetManagePage = lazy(() => import("./pages/PetManagePage"));
const Foundations = lazy(() => import("./pages/Foundations"));
const Home = lazy(() => import("./pages/Home"));
const SideBar = lazy(() => import("./components/SideBar"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      dispatch({ type: ISUSER, payload: true });
    }
  }, [dispatch]);

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
