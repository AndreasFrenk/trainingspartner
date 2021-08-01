import React, { Component, useState } from "react";
import { useSelector } from "react-redux";

import "../../styles/landingpage.scss";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const Landingpage = ()=>{
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const openModal = (modal: String) => {
    if (modal === 'Login') {
      setShowLoginModal(prev => !prev)
    } else if (modal === "Register")
     setShowRegistrationModal(prev => !prev)
  }



 // console.log(users)
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
