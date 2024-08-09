import React from "react";
import { useSelector } from "react-redux";

function OrderSummary() {
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);

  return <div>OrderSummary</div>;
}

export default OrderSummary;
