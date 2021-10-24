import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../actions/users";
import { userService } from "../../services/userService";
import placeHolderImage from "../../assets/placeholder_profile.jpeg";
import "../../styles/navbar.scss";
export const Navbar = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: any) => state.users?.user);
  const user = userService.getStoredUser();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const dropdownMenu = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const userid = userService.getStoredUserId();
  //   dispatch(userActions.getById(userid));
  // }, []);

  const logout = () => {
    dispatch(userActions.logout());
  };
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    console.log("handleClickOutside");
    if (!dropdownMenu.current?.contains(e.target as Node)) {
      setOpenMenu(false);
    }
  };
  return user ? (
    <div className="w-full light-orange-background p-2 flex justify-between items-center">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/nearUsers">Near Users</NavLink>
      <NavLink to="/chat">Chat</NavLink>
      <div
        className={`dropdown ${openMenu ? "dropdown--open" : ""}`}
        ref={dropdownMenu}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <div className="flex items-end cursor-pointer">
          <img
            className="rounded  mt-2 w-10 h-10 border-black mr-4"
            src={user?.profileImage ? user?.profileImage : placeHolderImage}
          ></img>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="dropdown__arrow"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        <div
          className={`rounded-md flex-col absolute mt-3 right-0 p-3 mr-1 light-blue-background hidden dropdown__navigation`}
        >
          <NavLink to="/edit-profile" className="p-2">
            Edit
          </NavLink>
          <NavLink to="/profile" className="p-2">
            me
          </NavLink>
          <a onClick={() => logout()} className="cursor-pointer p-2">
            Log Out
          </a>
        </div>
      </div>
    </div>
  ) : null;
};
