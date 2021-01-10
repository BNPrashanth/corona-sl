import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      {/* General Views */}
      <Route path={'/'} component={Dashboard} exact />
      <Redirect to={'/'} />
    </BrowserRouter>
  );
}

export default App;
