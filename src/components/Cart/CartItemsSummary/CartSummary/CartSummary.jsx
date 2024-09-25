import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartItem, setCartItemsDetails } from "../../../../utils/authSlice";
import ClearCart from "../../ClearCart/ClearCart";
import "./CartSummary.css";
import OrderDetails from "./OrderDetails";

function CartSummary() {
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleClearCart = async () => {
    if (!userId) {
      setMessage("User ID is required to clear the cart!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/clear/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json(); // Get error details from the response
        throw new Error(errorData.message || "Failed to clear the cart.");
      }

      const data = await res.json();
      console.log(data);
      dispatch(setCartItemsDetails(data.cartItemsDetails || {}));
      dispatch(setCartItem(data.cartItemsDetails?.totalItems || 0));
    } catch (err) {
      setMessage("Something went wrong while clearing the cart!");
      console.error(err);
    }
  };

  return (
    <div className="cart-summary">
      <h6>Order Details</h6>
      <OrderDetails
        itemp={"Price (1 Item)"}
        itemSpan={`$ ${
          cartItemsDetails && cartItemsDetails.totalPrice?.toFixed(2)
        }`}
      />
      <OrderDetails itemp={"Discount"} itemSpan={"- $50"} />
      <OrderDetails itemp={"Delivery Charges"} itemSpan={"$50"} />
      <OrderDetails
        itemp={<strong>Total Price:</strong>}
        itemSpan={
          <strong>
            ${cartItemsDetails && cartItemsDetails.totalPrice?.toFixed(2)}
          </strong>
        }
      />
      <p className="saving">
        <strong>You will save $50 on this order</strong>
      </p>
      <button className="place-order">
        <Link to="/place-order">Place Order</Link>
      </button>
      <ClearCart onClick={handleClearCart} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default CartSummary;
