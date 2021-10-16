const userReducers = (state = {}, action: any) => {
  switch (action.type) {
    case "GETALL_REQUEST":
      return { loading: true };
    case "GETALL_SUCCESS":
      return { users: action.users };
    case "GETALL_ERROR":
      return { error: action.error };
    case "GET_BYID_SUCCESS":
      return { user: action.user };
    case "GET_BYID_FAILURE":
      return { error: action.error };

    default:
      return state;
  }
};

export default userReducers;
