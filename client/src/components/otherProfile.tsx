import React, {  useEffect } from "react";
import backgroundImage from "../assets/wallpapersden.com_tony-hawk-s-pro-skater-1-remaster_wxl.jpg";
import "../styles/utils.scss";
import "../styles/pages/profile.scss";
import { userService } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions/users";
import { useParams } from "react-router-dom";
import placeHolderImage from "../assets/placeholder_profile.jpeg";
import { RouteComponentProps } from "react-router-dom";

interface props extends RouteComponentProps {

}

export const OtherProfile: React.FC<props> = ({history}) => {
  const dispatch = useDispatch();
  const { userid } = useParams() as { userid: string };
  const user = useSelector((state: any) => state.users?.user);

  useEffect(() => {
    if (userid) {
      if (userid === userService.getStoredUserId()) {
        history.push('/profile')
      } else {
        dispatch(userActions.getById(userid));
      }
    } else {
      alert("no user found");
    }
  }, []);

  return user ? (
    <div>
      <div
        className="w-full mb-6 background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="content">
        <img
          className="rounded profile__image -mt-32"
          src={user.profileImg ? user.profileImg : placeHolderImage}
        ></img>
        <div className="flex mt-4 justify-between w-full">
          <div>
            <div className="font-bold text-xl">{user?.username}</div>
            {user?.profile?.sports?.map((sport: String, index: number) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-2 inline-block mr-3 mt-3 rounded-lg"
              >
                {sport}
              </span>
            ))}
          </div>
          <div>
            <div className="mt-2 text-lg font-bold">Age</div>
            <div className="mt-2">{user?.profile?.age}</div>
          </div>
        </div>
      </div>
      <div className="profile__interests">
        <div></div>
      </div>
    </div>
  ) : null;
};
