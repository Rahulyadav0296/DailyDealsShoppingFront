import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo_ry from "../../assets/logo_ry.png";
import { setToken } from "../../utils/authSlice";
import ListItem from "./ListItem";
import "./Navbar.css";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const cartItem = useSelector((state) => state.auth.cartItem);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const handleLinkClick = () => setIsCollapsed(true);

  const handleLogout = () => {
    dispatch(setToken(null));
    navigate("/signin");
  };

  const isLoginPage = window.location.pathname === "/signin";

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
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
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
          <ul className="navbar-nav">
            {token === null ? (
              <li className="nav-item">
                <NavLink
                  style={({ isActive }) => ({
                    padding: "0px 5px 20px 5px",
                    color: isActive ? "#ff6600" : "#ffffff",
                  })}
                  className="nav-link"
                  to="/signin"
                  onClick={handleLinkClick}
                >
                  <PersonIcon className="icon" />
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <p
                  style={{ color: "white", marginTop: "15px" }}
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle"
                  onClick={handleLinkClick}
                >
                  <PersonIcon />
                </p>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "#ff6600" : "#000000",
                    })}
                    className="dropdown-item"
                    to={`/signup/${userId}`}
                    onClick={handleLinkClick}
                  >
                    My Account
                  </NavLink>
                </div>
              </li>
            )}
            {!isLoginPage && (
              <li className="nav-item">
                <NavLink
                  style={({ isActive }) => ({
                    padding: "0px 5px 20px 5px",
                    color: isActive ? "#ff6600" : "#ffffff",
                  })}
                  className="nav-link"
                  to={`/cart`}
                  onClick={handleLinkClick}
                >
                  <div className="cart-icon">
                    <ShoppingCartIcon />
                    <span className="cart-count">{cartItem}</span>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
