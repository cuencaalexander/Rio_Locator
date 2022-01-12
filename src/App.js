import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Locations from "./pages/Locations";
import MapView from "./pages/MapView";


function App() {
  
  return (
    <>
      <Routes>
          <Route exact path="/" element={<Locations/>}/>
          <Route exact path="directions" element={<MapView/>}/>
        </Routes>
    </>
    
  );
}

export default App;
