import React, { Component } from "react";
import { useSelector } from "react-redux";

import "../styles/pages/landingpage.scss";

const LandingPage = ()=>{
  const users = useSelector((state) => state.users)
  console.log(users)
  return (
    <div>
        <div className="navbar flex w-full justify-between px-12 absolute">
          
            <div>Logo</div>
            <div className="navbar__right">
            <a className="navbar__link">Jetzt registrieren</a>
        <a className="navbar__link pl-5">Anmelden</a>
        </div>
        </div>
   <div className="big-banner h-screen w-full bg-cover" style={{backgroundImage: `url(https://wallpapercave.com/wp/EtxonAb.jpg)`,}}>

    </div>
    </div>
  )
}

export default LandingPage;
