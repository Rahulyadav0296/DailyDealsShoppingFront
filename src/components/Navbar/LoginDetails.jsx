import PersonIcon from "@mui/icons-material/Person";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartNavbar from "./CartNavbar";
import LogoutNavbar from "./LogoutNavbar";

function LoginDetails({ handleLinkClick, setIsCollapsed }) {
  const token = useSelector((state) => state.auth.token);

  return (
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
        <>
          <LogoutNavbar
            handleLinkClick={handleLinkClick}
            setIsCollapsed={setIsCollapsed}
          />
          <CartNavbar handleLinkClick={handleLinkClick} />
        </>
      )}
    </ul>
  );
}

export default LoginDetails;
