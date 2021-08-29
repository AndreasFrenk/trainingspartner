
const nearUserReducers = (state = {}, action: any) => {
    switch (action.type) {
        case 'GET_NEAR_SUCCESS':
            return action.users
        case 'GET_NEAR_ERROR':
            return {error: action.error}
        default:
           return state; 
    }
}

export default nearUserReducers 