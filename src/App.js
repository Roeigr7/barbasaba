import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './authContext';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Wheel from './Wheel';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path='/' component={Wheel} />
        <Route exact path='/register' component={Register} />
      </Router>
    </AuthProvider>
  );
};

export default App;
