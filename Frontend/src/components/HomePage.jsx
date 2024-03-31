import { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Adjust sliding interval as needed

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="text-center">
      <p className="text-6xl mt-10 mb-8 text-black font-serif">
        Welcome to the crazy and weird world of vehicles
      </p>
      <div className="overflow-hidden h-[60vh]">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {data.map((wierdy) => (
            <div
              key={wierdy._id}
              className="flex-shrink-0 w-full flex flex-col justify-center items-center"
            >
              <img
                className="h-[50vh] object-cover"
                src={wierdy.ImgURL}
                alt={wierdy.Name}
              />
              <p className="text-2xl text-black mt-[62vh] absolute w-[15vw]">{wierdy.Name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
