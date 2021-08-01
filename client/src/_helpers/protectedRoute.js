import React, {useEffect} from 'react'
import { getCurrentUser } from "../actions/users";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";


    
export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
        const dispatch = useDispatch();
        const authenticated = useSelector((state) => state.authentication);
        useEffect(() => {
            dispatch(getCurrentUser())
        }, []);
        console.log(authenticated)
        const isAuthenticated = localStorage.getItem("user") ? true : false;
        console.log(isAuthenticated)
        
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }