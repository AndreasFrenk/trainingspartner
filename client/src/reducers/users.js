const userReducers = (users = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
        case 'CREATE':
            return users
        default:
           return users;
    }
}

export default userReducers