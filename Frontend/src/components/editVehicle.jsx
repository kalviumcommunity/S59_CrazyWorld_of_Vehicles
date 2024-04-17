import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditVehicle() {
  const { name } = useParams();
  const [data, setData] = useState({});
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [imgURLInput, setImgURLInput] = useState("");
  const [responseText, setResponseText] = useState("");

  const fetchData = () => {
    fetch(`http://localhost:8081/api/user-vehicle/${name}`)
      .then(resp => resp.json())
      .then(result => setData(result))
      .catch((err) => console.log(err));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/api/update-vehicle/${data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imgURL: imgURLInput || data.imgURL,
            name: nameInput || data.name,
            category: categoryInput || data.category,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setResponseText(JSON.stringify(responseData, null, 2));
      } else {
        setResponseText("Error updating data.");
      }
    } catch (err) {
      console.log(err);
      setResponseText("Error updating data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]); 
  return (
    <div>
      {data && (
        <form
          onSubmit={updateData}
          className="flex justify-center flex-col items-center shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
        >
          <img
            src={data.imgURL}
            alt={data.name}
            className="m-auto w-64 mb-10 shadow-lg rounded"
          />
          <input
            type="text"
            placeholder={data.name}
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
          />
          <input
            type="text"
            placeholder="Enter new URL"
            value={imgURLInput}
            onChange={(e) => {
              setImgURLInput(e.target.value);
            }}
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
          />
          <input
            type="text"
            placeholder={data.category}
            value={categoryInput}
            onChange={(e) => {
              setCategoryInput(e.target.value);
            }}
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
          />
          <button
            type="submit"
            className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600"
          >
            Commit Changes
          </button>
        </form>
      )}
      {responseText && <div>{responseText}</div>}
    </div>
  );
}

export default EditVehicle;
