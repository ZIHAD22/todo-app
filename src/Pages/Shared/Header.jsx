import React from "react";
import task from "../../assets/icon/task-icon.png";

const Header = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <img className="w-[100px]" src={task} alt="" />
      <h1 className="text-3xl pl-2 font-sans font-extrabold">Make Todo</h1>
    </div>
  );
};

export default Header;
