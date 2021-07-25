import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Profile from './components/profile';
import {getUsers} from './actions/users.js'
import LandingPage from './components/landingpage';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux'


function App() {
  const dispatch = useDispatch()


  useEffect(() => {
        dispatch(getUsers())
  }, [dispatch])

  return (
    <Router>
    <Route path="/" exact component={LandingPage} />
    <Route path="/profile" exact component={Profile} />
    </Router>
  );
}

export default App;
