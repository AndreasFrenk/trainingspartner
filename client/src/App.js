import './App.css';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Switch } from "react-router-dom";
import Profile from './components/profile';
import {getUsers} from './actions/users'
import Landingpage from './components/landingpage/Landingpage';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux'
import {ProtectedRoute} from './_helpers/protectedRoute'
import { Home } from './components/auth/home';
import { NearUsers } from './components/auth/nearUsers';



function App() {
  
  return (
    <BrowserRouter>
      <Router>
          <Switch>
            <Route path="/" exact component={Landingpage} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/nearUsers" exact component={NearUsers} />
            <ProtectedRoute path="/home" exact component={Home}></ProtectedRoute>
          </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
