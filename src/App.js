import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AddPet } from "./pages/AddPet";
import PetManagePage from "./pages/PetManagePage";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
import reducer from "./reducer";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";

const initialState = {
  user: {},
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={RegisterPage} />
            <Route exact path="/foundations/:id/pets" component={PetListPage} />
            <Route exact path="/pets/:id/request" />
            <Route exact path="/foundations/:id/add-pet" component={AddPet} />
            <Route exact path="/pets/:id/manage" component={PetManagePage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
