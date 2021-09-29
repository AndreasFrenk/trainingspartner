import React, { useEffect } from "react";
import { userActions } from "../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import placeHolderImage from "../../assets/placeholder_profile.jpeg";
import Navbar from "./navbar";

export const NearUsers: React.FC = () => {
  const dispatch = useDispatch();
  const nearUsers = useSelector((state: any) => state.nearUsers);
  useEffect(() => {
    dispatch(userActions.getNearUsers());
  }, []);

  // mockUsers for testing without internet
  const mockUsers = [
    {
      username: "User1",
      profile: {
        bios: "Hi Im User 1 i'd like to blalblasdihasduhd agfausfafd asgasufhaf asbfgaisf gasuidas diuahsf",
        age: 12,
        sports: ["Fahrrad", "Laufen"],
        location: {
          city: "Moosburg",
          country: "Germany",
        },
      },
    },

    {
      username: "User1",
      profileImage: "/static/media/tony_hawks_pro_skater_2020.f77ae5be.jpeg",
      profile: {
        bios: "Hi Im User 1 i'd like to blalblasdihasduhd agfausfafd asgasufhaf asbfgaisf gasuidas diuahsf",
        age: 12,
        sports: ["Fahrrad", "Laufen"],
        location: {
          city: "Moosburg",
          country: "Germany",
        },
      },
    },
  ];

  return nearUsers.user ? (
    <div>
      <Navbar currentPath="Near User"></Navbar>
      <div className="pt-20">

      <h1 className="text-gray-700 text-2xl px-4 py-5">Nearby Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 py-2 px-8">
        {nearUsers.user.map((user: any, index: number) => (
          <div
            key={index}
            className="overflow-hidden shadow-lg transform transition duration-500 hover:scale-110"
          >
            <img
              className="w-full max-h-28 object-contain"
              src={user.profileImage ? user.profileImage : placeHolderImage}
            ></img>
            <div className="py-4 px-4">
              <div className="font-bold text-xl">
                {user.username}
                <span className="font-ligh text-sm text-gray-700 pl-3">
                  {user.profile.location.city}
                </span>
              </div>
              <p className="text-gray-700">{user.profile.bios}</p>
            </div>
            <div className="px-4 py-4">
              {user.profile.sports.map((sport: String, index: number) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-2 mx-3 inline-block"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  ) : (
<div>

  <Navbar currentPath="Near User"></Navbar>
<div>Loading</div>
</div>
  );
};
