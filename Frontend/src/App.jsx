import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Weirdies from "./components/Weirdies";
import { Route, Routes } from "react-router-dom";
import AddVehicle from "./components/AddVehicle";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Weirdies" element={<Weirdies />} />
        <Route path="/AddVehicle" element={<AddVehicle />} />

      </Routes>
    </>
  );
}

export default App;
