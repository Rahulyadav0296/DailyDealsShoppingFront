import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./Root.css";

function Root() {
  return (
    <div className="root-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <div style={{ backgroundColor: "white" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Root;
