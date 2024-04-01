import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Weirdies from "./components/Weirdies";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Weirdies" element={<Weirdies />} />
      </Routes>
    </>
  );
}

export default App;
