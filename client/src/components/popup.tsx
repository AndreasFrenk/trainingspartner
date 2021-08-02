import React, { Component, useState } from "react";
import profileImage from "../assets/tony_hawks_pro_skater_2020.jpeg";
import "../styles/utils.scss";
import "../styles/pages/profile.scss";

interface profileSettings {
  showPopup: boolean;
  imageChange: Function;
}

const Popup = (props: profileSettings) => {
  const [fileSelected, setFileSelected] = React.useState<File>();
  const [fileName, setFileName] = React.useState();
  const [image, setImage] = React.useState<string>();
  const popupElement = React.createRef<HTMLDivElement>();

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
    previewImage(fileList[0] as Blob);
  };

  const previewImage = (image: Blob) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", function () {
      if (!this.result) return;
      setImage(this.result as string);
    });
    fileReader.readAsDataURL(image);
  };

  const uploadFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
    }
  };

  const listener = (e: MouseEvent | TouchEvent) => {
    if (!popupElement.current) return;
    if (!popupElement.current.contains(e.target as Node)) {
      props.imageChange();
    }
  };

  document.addEventListener("mousedown", listener);
  document.addEventListener("touchstart", listener);
  const uploadImage = () => {
    console.log("upload");
  };

  return (
    <div>
      {props.showPopup ? (
        <div
          className="popup p-10 text-white bg-gray-400 absolute m-auto right-0 left-0 max-w-screen-sm"
          ref={popupElement}
        >
          <div className="flex justify-between">
            <div>Profilbild</div>
            <button onClick={() => props.imageChange()}>X</button>
          </div>
            <img
              className="rounded profile__image mt-0 mx-auto"
              src={image ? image : profileImage}
              // onClick={uploadImage}
            ></img>
          <div className="footer flex justify-between">
            <div className="flex justify-between">
              <div>Edit</div>
              <label
                className="mx-2"
                htmlFor="image-selector__file-upload-input"
              >
                Upload Image
              </label>
            </div>
            <div>Delete</div>
          </div>
          <input
            type="file"
            className="hidden"
            id="image-selector__file-upload-input"
            onChange={(e: any) => handleImageChange(e)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Popup;
