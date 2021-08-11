import React from 'react'
import { userActions } from '../../actions/users'
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(userActions.logout())
    }
    return (
        <div>
            TESST
            <button onClick={()=>logout()}>Log Out</button>
        </div>
    )
}
