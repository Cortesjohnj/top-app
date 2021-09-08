import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import PetManagePage from "./pages/PetManagePage";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/foundations/:id/pets" component={PetListPage} />
          <Route exact path="/pets/:id/request" />
          <Route exact path="/foundations/:id/add-pet" />
          <Route exact path="/pets/:id/manage" component={PetManagePage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
