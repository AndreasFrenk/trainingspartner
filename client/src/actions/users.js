import * as api from '../api'

//action creators
export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchUsers()
        dispatch({type:'FETCH_ALL', payload:data})
    } catch (error) {
        console.log(error.message)
    }
}