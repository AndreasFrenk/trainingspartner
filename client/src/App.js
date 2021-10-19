import './App.css';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Switch } from "react-router-dom";
import {getUsers} from './actions/users'
import Landingpage from './components/landingpage/Landingpage';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux'
import {ProtectedRoute} from './_helpers/protectedRoute'
import { Home } from './components/auth/home';
import { Feed } from './components/auth/feed';
import { NearUsers } from './components/auth/nearUsers';
import  Chat from './components/chat/chat';
import {Profile} from './components/profile';
import {OtherProfile} from './components/otherProfile';
import { EditProfile } from './components/editProfile';



function App() {
  
  return (
    <BrowserRouter>
      <Router>
          <Switch>
            <Route path="/" exact component={Landingpage} />
            <Route path="/edit-profile" exact component={EditProfile} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:userid" exact component={OtherProfile} />
            <Route path="/nearUsers" exact component={NearUsers} />
            <Route path="/chat" exact component={Chat} />
            <ProtectedRoute path="/home" exact component={Home}></ProtectedRoute>
            <Route path="/feed" exact component={Feed} />
          </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
