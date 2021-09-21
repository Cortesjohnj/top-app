import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import { RegisterPage } from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import { AddPet } from "./pages/AddPet";
import PetManagePage from "./pages/PetManagePage";
import { Suspense, useEffect } from "react";
import Spinner from "./components/Spinner";
import Foundations from "./pages/Foundations";
import history from "./history";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { loadUser, logOut } from "./store/actionCreators";
import { AUTHORIZATION } from "./store/actions";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(AUTHORIZATION)) {
      dispatch(loadUser());
    } else {
      dispatch(logOut());
    }
  }, [dispatch]);

  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <PrivateRoute
            exact
            path="/foundations/:id/pets"
            component={PetListPage}
          />
          <PrivateRoute exact path="/:id/profile" component={UserProfile} />
          <Route exact path="/pets/:id/request" />
          <Route exact path="/foundations/:id/add-pet" component={AddPet} />
          <PrivateRoute
            exact
            path="/pets/:id/manage"
            component={PetManagePage}
          />
          <Route exact path="/foundations" component={Foundations} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
