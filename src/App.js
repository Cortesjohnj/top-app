import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/GeneralStyles.css';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <NotFound />
    </Router>
  );
}

export default App;
