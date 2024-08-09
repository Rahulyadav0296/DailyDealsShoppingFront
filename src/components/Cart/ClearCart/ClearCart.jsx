import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const CartActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "20px",
}));

const CartButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& a": {
    color: "inherit",
    textDecoration: "none",
    display: "block",
  },
}));

const ClearCartButton = styled(CartButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

function ClearCart({ onClick }) {
  return (
    <CartActions>
      <CartButton>
        <Link to="/products">Continue Shopping</Link>
      </CartButton>
      <ClearCartButton onClick={onClick}>Clear Cart</ClearCartButton>
    </CartActions>
  );
}

export default ClearCart;
