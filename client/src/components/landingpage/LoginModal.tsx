import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../actions/users";

interface Props {
  setShowModal: React.Dispatch<boolean>;
}

const LoginModal: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const authentication = useSelector((state: any) => state.authentication);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
    dispatch({type: 'LOGIN_RESET'})
  };
  const modalRef = React.useRef<HTMLInputElement>(null);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!modalRef.current?.contains(e.target as Node)) {
      closeModal();
    }
  };

  const  onSubmit  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      className="bg-black bg-opacity-50 absolute inset-0 flex
    justify-center items-center"
    >
      <div ref={modalRef} className="bg-white max-w-sm py-4 px-20 shadow-xl">
        <div className="flex justify-center items-center">
          <h1 className="text-blue-500 font-bold text-xl">Sign In</h1>
        </div>
        <div className="mt-2 text-sm">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                id="username"
              />
            </div>
            <div>
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
              />
            </div>
            {
                            authentication.failure ? <p className="text-red-600 py-2 px-3">{authentication.error}</p> : ""
                        }
            <div className="mt-5 flex justify-center space-x-3">
              <input
                type="submit"
                value="Log In"
                className="px-3 py-1 bg-blue-400 text-white hover:bg-opacity-80"
                id="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
