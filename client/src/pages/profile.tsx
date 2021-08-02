import React, { Component, useState } from "react";
import profileImage from "../assets/tony_hawks_pro_skater_2020.jpeg";
import backgroundImage from "../assets/wallpapersden.com_tony-hawk-s-pro-skater-1-remaster_wxl.jpg";
import "../styles/utils.scss";
import "../styles/pages/profile.scss";
import Popup from '../components/popup';

interface profileSettings {
  showPopup: boolean;
}
class Profile extends React.Component<{ }, profileSettings> {
  constructor(props: profileSettings) {
    super(props);
    this.state = { showPopup: false as boolean };
    this.imageChange = this.imageChange.bind(this);
  }
  imageChange() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <div
          className="w-full mb-6 background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="content">
          <Popup showPopup={this.state.showPopup} imageChange={this.imageChange}></Popup>
          <img
            className="rounded profile__image -mt-32"
            src={profileImage}
            onClick={this.imageChange}
          ></img>
          <div className="flex mt-4 justify-between">
            <div>
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
