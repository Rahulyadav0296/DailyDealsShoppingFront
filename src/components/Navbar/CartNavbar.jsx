import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function CartNavbar({ handleLinkClick }) {
  const cartItem = useSelector((state) => state.auth.cartItem);

  const isLoginPage = window.location.pathname === "/signin";
  return (
    <>
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
    </>
  );
}

export default CartNavbar;
