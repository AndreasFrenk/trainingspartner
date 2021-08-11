import { Action } from "redux";


export const registrationReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                registering: true,
            };
        case 'REGISTER_SUCCESS':
            return {
                registered: true,
            };
        case 'REGISTER_FAILURE':
            return {
                failure: true,
                error: action.error
            };
        case 'REGISTER_RESET':
            return {}
        default:
            return state
    }
}