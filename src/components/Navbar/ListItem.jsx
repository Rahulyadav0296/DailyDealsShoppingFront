import React from "react";
import { NavLink } from "react-router-dom";

function ListItem({ children, setIsCollapsed, to }) {
  return (
    <li className="nav-item">
      <NavLink
        style={({ isActive }) => ({
          color: isActive ? "greenyellow" : "white",
        })}
        className="nav-link"
        to={to}
        onClick={() => {
          setIsCollapsed(true);
        }}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default ListItem;
