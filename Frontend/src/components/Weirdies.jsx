import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Wierdies() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://s59-crazyworld-of-vehicles-1.onrender.com/api")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
    <div className="flex justify-center">
      <div className="flex justify-between ml-[30vw] mt-[4vh]">
        <h1 className="text-5xl">Wierd and Funny Vehicles</h1>
        <Link to="">
          <button className=" ml-[24vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Vehicle
          </button>
        </Link>
        </div>
        </div>
        <div className="grid grid-cols-2 place-items-center gap-10 m-6">
      {data.map((vehicle) => (
        <div key={vehicle._id} className="bg-white rounded-lg shadow-md p-6 w-[45vw]">
          <img src={vehicle.ImgURL} alt={vehicle.Name} className="w-full h-auto rounded-lg mb-2" />
          <p className="text-lg font-bold">{vehicle.Name}</p>
          <p className="text-gray-600">{vehicle.Category}</p>
        </div>
      ))}
      </div>
    </>
  );
}
