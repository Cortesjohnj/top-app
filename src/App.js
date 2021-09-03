import { Suspense } from 'react';
import './assets/styles/GeneralStyles.css';
import Spinner from './components/Spinner';

function App() {
  return <Suspense fallback={<Spinner />}></Suspense>;
}

export default App;
