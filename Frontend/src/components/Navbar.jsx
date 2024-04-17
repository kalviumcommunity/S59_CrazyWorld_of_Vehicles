import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between p-2 max-w-full h-[7vh] shadow-xl backdrop-grayscale bg-blue-400 text-xl">
        <div className="flex w-[10vw] items-center justify-between">
          <button className="text-gray-700">Countries</button>
          <Link to="/Weirdies">
            <button className="text-gray-700 ml-3">Wierdies</button>
          </Link>
        </div>
        <div className="flex items-center">CrazyWorld of Vehicles</div>
        <div className="flex flex-row justify-evenly items-center">

          <Link to="/">
            <div className="mr-3 cursor-pointer">Home</div>
          </Link>

          <div className="mr-3 cursor-pointer">About us</div>
            <div className="cursor-pointer">
             <Link to="/SignUp">
                <button>Sign-Up</button>
             </Link>
                
        </div>
        </div>
      </nav>
    </>
  );
}
