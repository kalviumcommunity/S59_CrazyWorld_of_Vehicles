import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { name } = useParams();
  const [data, setData] = useState({});

  const [Name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setImgURL] = useState("");

  const [responseText, setRes] = useState("");

  const fetchData = (name) => {
    fetch(`http://localhost:8081/api/user-vehicle/${name}`)
        .then(resp => resp.json())
        .then(result => setData(result))
        .catch((err) => console.log(err));
};

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://s59-crazyworld-of-vehicles-1.onrender.com/api/update-vehicle/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ImgURL: imgURL || data.ImgURL,
            Name: Name || data.Name,
            Category: category || data.Category,
            Details: details || data.Details,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setRes(JSON.stringify(responseData, null, 2));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(name);
    
  }, []);

  return (
    <div>
      {data && (
        <form
          onSubmit={updateData}
          className="flex justify-center flex-col items-center shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
        >
          <img
            src={data.ImgURL}
            alt={data.Name}
            className=" m-auto w-64 mb-10 shadow-lg rounded"
          />
          <input
            type="text"
            placeholder={data.Name}
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter new URL"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            onChange={(e) => {
              setImgURL(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={data.Category}
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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

export default UpdateProduct;


