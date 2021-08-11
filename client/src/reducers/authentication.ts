import { Action } from "redux";

let user = localStorage.getItem('user')
const initialState = user ? { loggedIn: true, user } : {};

export const authenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            };
        case 'LOGIN_SUCCESS':
            return {
                loggedIn: true,
                user: action.user
            };
        case 'LOGIN_FAILURE':
            return {
                failure: true,
                error: action.error
            };
        case 'LOGOUT':
            return {
                loggedIn: false
            };
        case 'LOGIN_RESET':
            return {};
        default:
            return state
    }
}