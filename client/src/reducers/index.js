import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication";
import userReducers from "./users";

export default combineReducers({
    users: userReducers,
    authentication: authenticationReducer
})