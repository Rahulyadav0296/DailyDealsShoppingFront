import { styled } from "@mui/material/styles";
import React from "react";

const CartItemsTitleDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 25px",
  backgroundColor: "#fff",
  borderBottom: `2px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  "& h5": {
    flex: 1,
    textAlign: "left",
    margin: "0",
    fontSize: "18px",
    color: theme.palette.text.primary,
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  "& h5:not(:first-of-type)": {
    textAlign: "center",
  },
}));

function CartItemsTitle() {
  return (
    <CartItemsTitleDiv>
      <h5>Product</h5>
      <h5>Price</h5>
      <h5>Quantity</h5>
    </CartItemsTitleDiv>
  );
}

export default CartItemsTitle;
