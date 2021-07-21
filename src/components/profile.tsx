import React, { Component } from "react";
import profileImage from "../assets/tony_hawks_pro_skater_2020.jpeg";
import backgroundImage from "../assets/wallpapersden.com_tony-hawk-s-pro-skater-1-remaster_wxl.jpg";
import "../styles/utils.scss";
import "../styles/profile.scss";

class Profile extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  componentDidMount() {}
  render() {
    return (
      <div>
        <div
          className="w-full mb-6 background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="content">
          <img className="rounded profile__image" src={profileImage}></img>
          <div className="flex mt-4 justify-between">
            <div >
              <div className="font-bold text-xl">Andreas Frenk</div>
              <div className="mt-2">Hobbyathlet</div>
              <div className="mt-2">Münster</div>
            </div>
            <div>
            <div className="mt-2">Lorem Ipsum</div>
            <div className="mt-2">Lorem Ipsum</div>
            </div>
          </div>
        </div>
        <div className="profile__interests">
          <div></div>
        </div>
      </div>
    );
  }
}

export default Profile;
