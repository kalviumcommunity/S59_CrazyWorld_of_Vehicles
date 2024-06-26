import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Weirdies() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8081/api")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/api/${id}` , {
      method: "DELETE", 
    }) 
      .then((res) => res.json()) 
      .then((result) => { 
        setData(result); 
        window.location.reload(); 
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
          <h1 className="text-5xl">Weird and Funny Vehicles</h1>
          <Link to="/AddVehicle">
            <button className="ml-[24vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Vehicle
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-center gap-10 m-6">
        {data.map((vehicle) => ( 
          <div key={vehicle._id} className="bg-white rounded-lg shadow-md p-6 w-[45vw]">
            <img src={vehicle.imgURL} alt={vehicle.name} className="w-full h-[60vh] rounded-lg mb-2" />
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold">{vehicle.name}</p>
              <div className="flex justify-between w-[5vw]">
                <Link to={`/EditVehicle/${vehicle._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
              </div>
            </div>
            <p className="text-gray-600">{vehicle.category}</p>
          </div>
        ))}
      </div>
    </>
  );
}