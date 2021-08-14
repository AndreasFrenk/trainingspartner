import React, { Component, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { userActions, logout } from "../../actions/users";

import "../../styles/landingpage.scss";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

interface Props extends RouteComponentProps {

}

const Landingpage: React.FC<Props> = ({history})=>{
  const dispatch = useDispatch()
  const authenticated = useSelector((state: any) => state.authentication);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const openModal = (modal: String) => {
    if (modal === 'Login') {
      setShowLoginModal(prev => !prev)
    } else if (modal === "Register")
     setShowRegistrationModal(prev => !prev)
  }

  useEffect(() => {
    dispatch(userActions.getCurrentUser())
  }, []);

  useEffect(() => {
    if (authenticated.loggedIn) {
      history.push('/home')
    }
  }, [authenticated]);

  return (
    <div>
        <div className="navbar flex w-full justify-between px-12 absolute">
            <div>Logo</div>
            <div className="navbar__right">
            <button onClick={() => openModal('Register')} className="navbar__link">Jetzt registrieren</button>
          <button className="navbar__link pl-5" onClick={() => openModal('Login')}>Anmelden</button>
        </div>
        </div>
       <div className="big-banner h-screen w-full bg-cover" style={{backgroundImage: `url(https://wallpapercave.com/wp/EtxonAb.jpg)`,}}>

    </div>
    {showRegistrationModal? <RegistrationModal setShowModal={setShowRegistrationModal}></RegistrationModal> : ""}
    {showLoginModal? <LoginModal setShowModal={setShowLoginModal}></LoginModal> : ""}
    </div>
  )
}

export default Landingpage;
