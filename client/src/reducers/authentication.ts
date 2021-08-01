import { Action } from "redux";

let user = localStorage.getItem('user')
console.log(user)
const initialState = user ? { loggedIn: true, user } : {};

export const authenticationReducer = (state = initialState, action: any) => {
    console.log(localStorage.getItem('user'))
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            };
        case 'LOGIN_SUCCESS':
            console.log(action)
            return {
                loggedIn: true,
                user: action.user
            };
        case 'LOGIN_FAILURE':
            return {};
        case 'LOGOUT':
            return {};
        default:
            return state
    }
}