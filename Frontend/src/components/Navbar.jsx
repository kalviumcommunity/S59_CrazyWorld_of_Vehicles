import React from 'react'

export default function Navbar() {
  return (
    <>
    <nav className="flex justify-between p-2 max-w-full h-[7vh] shadow-xl backdrop-grayscale bg-blue-400">
      <div className="flex w-[20vw]">
      <select className='mr-3'>
      <option value="vehicles">Vehicles</option>
      <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <button>Wierdies</button>
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
