import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/authSlice";
import "./LogoutNavbar.css";

function LogoutNavbar({ handleLinkClick, setIsCollapsed }) {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/signup/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response from server is not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User Details are: ", data);
          setAccount(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    dispatch(setToken(null));
    setIsCollapsed(true);
    navigate("/signin");
  };
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#ff6600" : "#000000",
          })}
          className="nav-link"
          to={`/signup/${userId}`}
          onClick={handleLinkClick}
        >
          <img
            src={
              account.profilePicture === ""
                ? "https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                : account.profilePicture
            }
            alt={account.firstName}
          />
        </NavLink>
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
