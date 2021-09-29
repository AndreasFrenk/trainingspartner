import React, { Component, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { userActions, logout } from "../../actions/users";

import "../../styles/landingpage.scss";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import backgroundImage from "../../assets/cycling.jpg";
import logo from "../../assets/logo_small.png";
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
        <div className="bg-primary flex w-full justify-between py-1 px-12 absolute">
            <img src={logo} className="max-h-10"></img>
            <div className="navbar__right self-center">
          <button id="login" className="navbar__link pl-5 text-secondary" onClick={() => openModal('Login')}>Anmelden</button>
        </div>
        </div>
       <div className="big-banner h-screen w-full bg-cover" style={{backgroundImage: `url(${backgroundImage})`,}}>

        <div className="grid grid-cols-2 mx-20 gap-4 text-secondary pt-80">
            <div></div>
         <div className="bg-primary text-lg rounded-md bg-opacity-75 p-3">
             <p >Du suchst einen Trainingspartner? Dann bist du hier genau richtig! Finde einen Partner für dein nächstes Workout. 
              <button id="registration" onClick={() => openModal('Register')} className="font-bold px-1 navbar__link">Jetzt registrieren</button>
             </p>
           </div> 
        </div>
    </div>
    {showRegistrationModal? <RegistrationModal setShowModal={setShowRegistrationModal}></RegistrationModal> : ""}
    {showLoginModal? <LoginModal setShowModal={setShowLoginModal}></LoginModal> : ""}
    </div>
  )
}

export default Landingpage;
