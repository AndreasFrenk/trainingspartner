import React from 'react'
import { userActions } from '../../actions/users'
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from '../page-components/navbar';

export const Home = () => {
    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(userActions.logout())
    }
    return (
        <div>
        {/* <Navbar></Navbar> */}
            TESST
            <button onClick={()=>logout()}>Log Out</button>
        </div>
    )
}
