
import { useHistory } from 'react-router-dom'
import { Action } from 'redux'
import { userService, IUser } from '../services/userService'


//action creators
export const getUsers = () => async (dispatch: any) => {
    dispatch({type: 'GETALL_REQUEST'})
    userService.getAll().then(
        users => {
            dispatch({type: 'GETALL_SUCCESS', users})
        },
        error => {
            dispatch({type: 'GETALL_FAILURE'}, error)
        }
    )
}

export const register = (userParam: IUser) => async (dispatch: any) => {
    dispatch({type:'REGISTER_REQUEST'})
    userService.register(userParam).then(
        user => {
            dispatch({type: 'REGISTER_SUCCESS', user})
            //Push history
        },
        error => {
            dispatch({type: 'REGISTER_FAILURE', error: error.response.data.message})
            //dispatch Alert Function
        }
    )
}


export const login = ({username, password}: IUser)  => (dispatch: any) => {
        dispatch({type:'LOGIN_REQUEST', username })
        userService.login({username, password})
            .then(
                user => {
                    dispatch({type: 'LOGIN_SUCCESS', user})
                },
                error => {
                    dispatch({type: 'LOGIN_FAILURE',  error: error.response.data.message})
                    //dispatch Alert Function
                }
            )
}

export const logout = () => (dispatch: any) => {
    userService.logout()
    dispatch({type:'LOGOUT'})
}

export const getCurrentUser = () => async (dispatch: any) => {
    userService.getCurrent()
    .then(
        user => {
            dispatch({type: 'LOGIN_SUCCESS', user})
            //Push history
        },
        error => {
            dispatch({type: 'LOGIN_FAILURE'}, error)
            //dispatch Alert Function
        }
    )
}

export const updateImage = (userParam: IUser) => async (dispatch: any) => {
    dispatch({type:'UPDATEIMAGE_REQUEST'})
    userService.updateImage(userParam.profileImage as FormData).then(
        user => {
            dispatch({type: 'UPDATEIMAGE_SUCCESS', user})
            //Push history
        },
        error => {
            dispatch({type: 'UPDATEIMAGE_FAILURE'}, error)
            //dispatch Alert Function
        }
    )
}
export const userActions = {
    getUsers,
    getCurrentUser,
    logout,
    login,
    register,
    updateImage
}