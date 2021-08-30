import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetListPage from "./pages/PetListPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/foundations/:id/pets" component={PetListPage} />
        <Route exact path="/request" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
