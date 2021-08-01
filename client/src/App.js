import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Profile from './components/profile';
import {getUsers} from './actions/users'
import Landingpage from './components/landingpage/Landingpage';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux'
import {ProtectedRoute} from './_helpers/protectedRoute'
import { Home } from './components/auth/home';



function App() {
  
  return (
    <Router>
    <Route path="/" exact component={Landingpage} />
    <Route path="/profile" exact component={Profile} />
    <ProtectedRoute path="/home" exact component={Home}></ProtectedRoute>
    </Router>
  );
}

export default App;
