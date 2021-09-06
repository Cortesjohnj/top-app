import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PetForm from './components/pet-form/PetForm';
import LoginPage from './pages/LoginPage';
import PetListPage from './pages/PetListPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/login" component={LoginPage} />
        <Route exact path="/foundations/:id/pets" component={PetListPage} />
        <Route exact path="/pets/:id/request" />
        <Route exact path="foundations/:id/add-pet" /> */}
        <PetForm />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
