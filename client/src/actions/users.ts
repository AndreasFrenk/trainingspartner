
import { useHistory } from 'react-router-dom'
import { Action } from 'redux'
import * as api from '../api'
import { userService } from '../services/userService'


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

export const register = (userParam: api.IUser) => async (dispatch: any) => {
    dispatch({type:'REGISTER_REQUEST'})
    userService.register(userParam).then(
        user => {
            dispatch({type: 'REGISTER_SUCCESS', user})
            //Push history
        },
        error => {
            dispatch({type: 'REGISTER_FAILURE'}, error)
            //dispatch Alert Function
        }
    )
}


export const login = ({username, password}: api.IUser)  => (dispatch: any) => {
        dispatch({type:'LOGIN_REQUEST', username })
        userService.login({username, password})
            .then(
                user => {
                    dispatch({type: 'LOGIN_SUCCESS', user})
                    // TODO: Push to /home
                },
                error => {
                    dispatch({type: 'LOGIN_FAILURE'}, error)
                    //dispatch Alert Function
                }
            )
}

export const logout = () => (dispatch: any) => {
    userService.logout()
    dispatch({type:'LOG_OUT'})
}

export const getCurrentUser = () => async (dispatch: any) => {
    userService.getCurrent()
    .then(
        user => {
            console.log(user)
            dispatch({type: 'LOGIN_SUCCESS', user})
            //Push history
        },
        error => {
            dispatch({type: 'LOGIN_FAILURE'}, error)
            //dispatch Alert Function
        }
    )
}