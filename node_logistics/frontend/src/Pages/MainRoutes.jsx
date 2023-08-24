import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Items from "./Items";
import Vehicles from "./vehicles";
import Orders from "./Order";


const MainRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items" element={<Items />}/>
        <Route path="/vehicles" element={<Vehicles />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
    );
  };
  
  export default MainRoutes;
  