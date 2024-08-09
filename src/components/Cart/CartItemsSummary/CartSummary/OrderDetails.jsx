import React from "react";
import "./OrderDetails.css";
function OrderDetails({ itemp, itemSpan }) {
  return (
    <div className="order-details">
      <p>{itemp}</p>
      <span>{itemSpan}</span>
    </div>
  );
}

export default OrderDetails;
