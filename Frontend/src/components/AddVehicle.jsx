import React, { useState } from "react";

export default function AddVehicle() {
  const [Name, setName] = useState("");
  const [ImgURL, setImgURL] = useState("");
  const [Category, setCategory] = useState("");
  const [Details, setDetails] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgURLChange = (e) => {
    setImgURL(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://s59-crazyworld-of-vehicles-1.onrender.com/api/add-weirdy", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: Name, ImgURL: ImgURL, Category: Category })
      });

      if (response.ok) {
        const respData = await response.json();
        setData(respData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[30vw] mx-auto bg-white rounded-lg shadow-md p-8 mt-10 flex flex-col justify-center place-items-center">
      <h2 className="text-2xl font-bold mb-6">Add a Weirdy Vehicle</h2>
      <input
        value={Name}
        onChange={handleNameChange}
        type="text"
        className="input-field"
        placeholder="Enter Vehicle Name"
      />
      <br/>
      <input
        value={ImgURL}
        onChange={handleImgURLChange}
        type="text"
        className="input-field"
        placeholder="Add Image URL"
      />
      <br/>
      <input
        value={Category}
        onChange={handleCategoryChange}
        type="text"
        className="input-field"
        placeholder="Enter Category"
      />
      <br/>
      <textarea
        value={Details}
        onChange={handleDetailsChange}
        className="input-field h-24 resize-none"
        placeholder="Enter Details"
      ></textarea>
      <br/>
      <div className="text-center mt-6">
        <button
          className="bg-red-500 rounded px-6 py-2 text-white hover:bg-red-600"
          onClick={handleSubmit}
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
}
