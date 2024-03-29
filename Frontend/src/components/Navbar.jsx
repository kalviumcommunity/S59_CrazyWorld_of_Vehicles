import React from 'react'


export default function Navbar() {
  return (
    <>
    <nav className="flex justify-between p-2 max-w-full h-[7vh] shadow-xl backdrop-grayscale bg-blue-400 text-xl">
      <div className="flex w-[10vw] items-center justify-between">
  {/* <div className="flex items-center justify-between cursor-pointer"> */}
    <button className="text-gray-700">Countries</button>  
  {/* <ul className="absolute bg-white border border-gray-200 rounded-md shadow-md mt-1 px-2 py-1 w-48 right-0 invisible opacity-0 transition duration-300 ease-in-out">
    <li className="text-gray-700">Country</li>
    <li className="text-gray-700">Brand</li>
  </ul> */}
  <button className="text-gray-700">Wierdies</button>
      </div> 
      <div className="flex items-center">CrazyWorld of Vehicles</div>
      <div className="flex flex-row justify-evenly items-center">
      <div className='mr-3 cursor-pointer'>Home</div>
      <div className='mr-3 cursor-pointer'>About us</div>
      <div className="cursor-pointer">Login</div>
      </div> 
    </nav>
    </>
  )
}
