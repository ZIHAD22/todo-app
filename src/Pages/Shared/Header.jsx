import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import task from "../../assets/icon/task-icon.png";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="grid grid-cols-2 mx-5">
      <div className="flex justify-start items-center my-5">
        <Link to="/">
          <img className="w-[100px]" src={task} alt="" />
        </Link>
        <h1 className="text-3xl pl-2 font-sans font-extrabold">Make Todo</h1>
      </div>

      <div className="my-auto text-right">
        {user?.uid ? (
          <>
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-accent"
              to="/signIn"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline btn-accent" to="/signIn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
