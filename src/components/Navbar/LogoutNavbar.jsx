import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/authSlice";
import useFetch from "../Hooks/useFetch";
import "./LogoutNavbar.css";

function LogoutNavbar({ handleLinkClick, setIsCollapsed }) {
  const [account, setAccount] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useFetch({
    url: "http://localhost:5000/users",
    id: userId,
  });

  const handleLogout = () => {
    dispatch(setToken(null));
    setIsCollapsed(true);
    navigate("/signin");
  };

  useEffect(() => {
    if (results) {
      setAccount(results);
    }
  }, [results]);

  return (
    <ul className="navbar-nav">
      <li className="dropdown" style={{ margin: "0px 15px" }}>
        <div
          className="dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={
              account && account.profilePicture
                ? account.profilePicture
                : "https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt={account ? account.firstName : "User"}
            className="profile-image"
          />
        </div>
        <div
          style={{ backgroundColor: "white" }}
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#ff6600" : "#000000",
            })}
            className="nav-link"
            to={`/users/${userId}`}
            onClick={handleLinkClick}
          >
            My Account
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#ff6600" : "#000000",
            })}
            className="nav-link"
            to={"/order-summary"}
            onClick={handleLinkClick}
          >
            Order Summary
          </NavLink>
        </div>
      </li>

      <li className="nav-item">
        <button onClick={handleLogout} className="nav-link-logout">
          Logout
        </button>
      </li>
    </ul>
  );
}

export default LogoutNavbar;
