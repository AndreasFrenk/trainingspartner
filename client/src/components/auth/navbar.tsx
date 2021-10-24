import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import logo from "../../assets/logo_small.png";
import { logout } from '../../actions/users';
import { useDispatch } from 'react-redux';
interface Props {
    currentPath: string
}

const Navbar: React.FC<Props> = (Props) => {

     const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logout())
    }

    return (
        <div className="bg-primary flex w-full grid grid-cols-3 justify-items-center py-1 px-12 ">
            <img src={logo} className="max-h-10"></img>
            <div className="items-center self-center text-secondary">
                <Link to="/home" className={"inline-block px-3" + (Props.currentPath =="Home" ? "underline" : "") }>Home</Link>
                <Link to="/nearUsers" className={"inline-block px-3 hover:scale-50" + (Props.currentPath =="Near Users" ? "underline" : "") }>Near Users</Link>
                <Link to="/profile" className={"inline-block px-3 " + (Props.currentPath =="Profile" ? "underline" : "") }>Profile</Link>
            </div>
            <div className="navbar__right self-center">
          <button id="logout" className="text-secondary" onClick={() => logOut()}>Log Out</button>
        </div>
        </div>
    )
}
 
export default Navbar

