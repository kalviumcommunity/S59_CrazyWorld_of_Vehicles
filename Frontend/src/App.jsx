import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Weirdies from "./components/Weirdies";
import { Route, Routes } from "react-router-dom"
import AddVehicle from "./components/AddVehicle";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Weirdies" element={<Weirdies />} />
        <Route path="/AddVehicle" element={<AddVehicle />} />
        <Route path="/editVehicle" element={<editVehicle />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="SignIn" element={<SignIn/>} />
      </Routes>
    </>
  );
}

export default App;
