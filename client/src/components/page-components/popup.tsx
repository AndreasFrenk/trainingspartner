import React, { Component, useState } from "react";
import "../../styles/utils.scss";
import "../../styles/pages/profile.scss";
import "../../styles/components/popup.scss";
import {updateImage} from "../../actions/users";
import { useDispatch } from "react-redux";
import profileImage from "../../assets/tony_hawks_pro_skater_2020.jpeg";
import { userService } from "../../services/userService";

interface profileSettings {
  showPopup: boolean;
  displayPopup: Function;
  updateProfileImage: Function;
  displayType: string;
  profileImg?: string;
}
const Popup = (props: profileSettings) => {
  const [fileSelected, setFileSelected] = React.useState<Blob>();
  const [image, setImage] = React.useState<string>();
  const popupElement = React.createRef<HTMLDivElement>();
  const [imageChanged, setImageChanged] = React.useState<boolean>();
  const dispatch = useDispatch()
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
    previewImage(fileList[0] as Blob);
  };
  const previewImage = (profileImage: Blob) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function () {
      if (!this.result) return;
      setImage(this.result as string);
      setImageChanged(true);
    });
    fileReader.readAsDataURL(profileImage);
  };

  const uploadImage = () => {

    const data = new FormData();
    data.append("file", fileSelected as Blob);
    // dispatch(updateImage({profileImage: data as FormData}))
    setTimeout(() => {
    props.updateProfileImage()
    props.displayPopup()
    }, 4000)
  }
  const listener = (e: MouseEvent | TouchEvent) => {
    if (!popupElement.current) return;
    if (!popupElement.current.contains(e.target as Node)) {
      props.displayPopup();
    }
  };
  document.addEventListener("mousedown", listener);
  document.addEventListener("touchstart", listener);

  return (
    <div>
      {props.displayType === 'image' && props.showPopup === true ? (
        <div
          className="popup rounded-xl p-10 text-white bg-gray-400 absolute m-auto right-0 left-0 max-w-screen-sm"
          ref={popupElement}
        >
          <div className="flex justify-between">
            <div>Profilbild</div>
            <button onClick={() => props.displayPopup()}>X</button>
          </div>
          <img
            className="rounded  mt-0 mx-auto w-60 h-60"
            src={(image ? image : (props.profileImg ? props.profileImg : profileImage)) }
          ></img>
          <div className="footer flex justify-between">
            <div className="flex justify-between cursor-pointer">
              <div>Edit</div>
              <label
                className="mx-2 cursor-pointer"
                htmlFor="image-selector__file-upload-input"
              >
                Upload Image
              </label>
            </div>
            <div className="flex">
            <div className="cursor-pointer mr-2">Delete</div>
            {
              imageChanged === true ?
            <div className="cursor-pointer" onClick={() => uploadImage()}>Save</div>
            : null
            }
          </div>
          </div>
          <input
            type="file"
            className="hidden"
            id="image-selector__file-upload-input"
            onChange={(e: any) => handleImageChange(e)}
          />
        </div>
      ) : null}
      {props.displayType === 'profile' && props.showPopup === true ? (
        <div
          className="rounded-xl popup p-10 text-white bg-gray-400 absolute m-auto right-0 left-0 sm:max-w-screen-sm"
          ref={popupElement}
        >
          <div className="popup__content">
            <div className="text-lg font-bold text-center">Profile Info </div>
          <div className="flex sm:flex-row flex-col">
          <div className="aside">Name</div><input className="flex-grow text-black" type="name"></input>
          </div>
          <div className="flex sm:flex-row flex-col">
          <div className="aside">Username</div><input className="flex-grow text-black" type="name"></input>
          </div>
          <div className="flex sm:flex-row flex-col">
          <div className="aside">Bio</div><textarea className="flex-grow text-black"></textarea>
          </div>
          <div className="flex sm:flex-row flex-col">
          <div className="aside">Hobbies</div><input className="flex-grow text-black" type="name"></input>
        </div>
        </div>
        </div>
      ) : null}
    </div>
  );
};
export default Popup;