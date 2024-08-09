import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const Message = styled("p")(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: "bold",
  marginTop: "20px",
}));

const Button = styled(Link)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  textDecoration: "none",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EmptyCartContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  marginTop: "20px",
}));

function EmptyCart() {
  return (
    <EmptyCartContainer>
      <Message>Your Cart is Empty!</Message>
      <Button to="/products">Continue Shopping</Button>
    </EmptyCartContainer>
  );
}

export default EmptyCart;
