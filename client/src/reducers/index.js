import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication";
import nearUserReducers from "./nearUsers";
import { registrationReducer } from "./registration";
import userReducers from "./users";

export default combineReducers({
    users: userReducers,
    authentication: authenticationReducer,
    registration: registrationReducer,
    nearUsers: nearUserReducers
})