import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";
import PetManagePage from "./pages/PetManagePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/foundations/:id/pets" component={PetListPage} />
        <Route exact path="/pets/:id/request" />
        <Route exact path="/foundations/:id/add-pet" />
        <Route exact path="/pets/:id/manage" component={PetManagePage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
