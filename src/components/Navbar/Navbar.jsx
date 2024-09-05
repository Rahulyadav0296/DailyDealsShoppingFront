import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo_ry from "../../assets/logo_ry.png";

import ListItem from "./ListItem";
import LoginDetails from "./LoginDetails";
import "./Navbar.css";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark mb-4 border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img
            src={logo_ry}
            alt="The logo"
            width="72"
            height="57"
            style={{ borderRadius: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed && "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <ListItem setIsCollapsed={setIsCollapsed} to="/">
              Home
            </ListItem>
            <ListItem setIsCollapsed={setIsCollapsed} to="/products">
              Shop
            </ListItem>
            <ListItem setIsCollapsed={setIsCollapsed} to="/blog">
              Blog
            </ListItem>
            <ListItem setIsCollapsed={setIsCollapsed} to="/contact">
              Contact
            </ListItem>
          </ul>
          <LoginDetails
            handleLinkClick={handleLinkClick}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
