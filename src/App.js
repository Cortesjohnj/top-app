import { BrowserRouter} from 'react-router-dom'
import React from 'react';
import Home from './pages/Home'

function App( ) {
  return (
    <BrowserRouter>
        <Home />
    </BrowserRouter>
  )
}

export default App;
