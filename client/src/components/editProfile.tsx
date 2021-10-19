import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { userActions } from "../actions/users";
import { userService } from "../services/userService";
import placeHolderImage from "../assets/placeholder_profile.jpeg";
import "../styles/utils.scss";

interface props extends RouteComponentProps {}

export const EditProfile: React.FC<props> = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.users?.user);
  const [editUser, setEditUser] = useState<any>(user?.profile);
  const [fileSelected, setFileSelected] = React.useState<Blob>();
  const [imageChanged, setImageChanged] = React.useState<boolean>();
  const [image, setImage] = React.useState<string>();
  useEffect(() => {
    const userid = userService.getStoredUserId();
    dispatch(userActions.getById(userid));
  }, []);
  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleChange = (e: Event, profile: boolean, location?: boolean) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.value as string;
    const name = target.name as string;

    setEditUser((previousUser: any) => {
      let newUser = { ...previousUser };
      if (profile) {
        if (location) {
          let newProfile = { ...previousUser.profile };
          Object.assign(newProfile, { location: { [name]: value } });
          Object.assign(newUser, { profile: newProfile });
        } else {
          let newProfile = { ...previousUser.profile };
          Object.assign(newProfile, { [name]: value });
          Object.assign(newUser, { profile: newProfile });
        }
      } else {
        Object.assign(newUser, { [name]: value });
      }
      return newUser;
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(userActions.updateUser(editUser));
    if (imageChanged) {
      uploadImage();
    }
    //hacky stuff going on here, should implement some dispatch thunk stuff
    //to wait for dispatch to finish
    setTimeout(() => {
      history.push("/profile");
    }, 2000);
  };
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
    const profileImage = new FormData();
    console.log(fileSelected);
    profileImage.append("file", fileSelected as Blob);
    dispatch(userActions.updateImage(profileImage));
  };

  return editUser ? (
    <div className="border-2 p-4 max-w-4xl m-auto mt-8 light-blue-background rounded-lg">
      <div className="text-xl underline font-bold text-center pb-3">
        Profile Info{" "}
      </div>
      <div className="">
        <div className="flex sm:flex-row items-end">
          <img
            className="rounded  mt-2 w-28 h-28 border-black"
            src={
              image
                ? image
                : editUser?.profileImage
                ? editUser?.profileImage
                : placeHolderImage
            }
          ></img>
          <label
            className="mx-2 cursor-pointer flex items-center"
            htmlFor="image-selector__file-upload-input"
          >
            <div className="mr-2 text-base font-bold cursor-pointer">Edit</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
            </svg>
          </label>
          <input
            type="file"
            className="hidden"
            id="image-selector__file-upload-input"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e: any) => handleImageChange(e)}
          />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-8">
          {/* <div className="flex flex-col sm:flex-row"> */}
          <div className="flex">
            <div className="aside mr-3 sm:mr-10 font-bold text-lg">
              Username:
            </div>
            <div>{editUser?.username}</div>
          </div>
          {/* <div className="flex sm:flex-row flex-col mt-4"> */}
          <div className="border-t border-current mt-2"></div>
          <div className="flex  mt-2">
            <div className="aside mr-3 sm:mr-10 font-bold text-lg">Age:</div>
            <input
              className="flex-grow text-black mr-3 sm:mr-10 bg-transparent cursor-pointer"
              name="age"
              type="number"
              value={editUser?.profile?.age}
              onChange={(e) => {
                handleChange(e as any, true);
              }}
              id="age_input"
            ></input>
            <label
              className="flex items-center cursor-pointer"
              htmlFor="age_input"
            >
              <div className="mr-2 text-base font-bold">Edit</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
              </svg>
            </label>
          </div>
          <div className="border-t border-current mt-2"></div>
          <div className="flex mt-2">
            <div className="aside mr-3 sm:mr-10 font-bold text-lg">Sports:</div>
            <input
              className="flex-grow text-black mr-3 sm:mr-10 bg-transparent cursor-pointer"
              type="sports"
              name="sports"
              id="sports_input"
              value={editUser?.profile?.sports}
              onChange={(e) => {
                handleChange(e as any, true);
              }}
            ></input>
            <label
              className="flex items-center cursor-pointer"
              htmlFor="sports_input"
            >
              <div className="mr-2 text-base font-bold">Edit</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
              </svg>
            </label>
          </div>
          <div className="border-t border-current mt-2"></div>
          <div className="flex mt-2">
            <div className="aside mr-3 sm:mr-10 font-bold text-lg">City:</div>
            <input
              className="flex-grow text-black mr-3 sm:mr-10 bg-transparent cursor-pointer"
              type="text"
              name="city"
              value={editUser?.profile?.location?.city}
              onChange={(e) => {
                handleChange(e as any, true, true);
              }}
              id="location_input"
            ></input>
            <label
              className="flex items-center cursor-pointer"
              htmlFor="location_input"
            >
              <div className="mr-2 text-base font-bold">Edit</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
              </svg>
            </label>
          </div>
          <div className="border-t border-current mt-2"></div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="p-3 font-bold rounded-lg mt-3 light-orange-background cursor-pointer"
            ></input>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
