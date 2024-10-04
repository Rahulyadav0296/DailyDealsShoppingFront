import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsDetails } from "../../utils/authSlice";
import useFetch from "../Hooks/useFetch";
import CartItemsSummary from "./CartItemsSummary/CartItemsSummary";
import EmptyCart from "./EmptyCart/EmptyCart";

const Div = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "90%",
  margin: "30px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Title = styled("h1")(({ theme }) => ({
  fontSize: "2rem",
  margin: "20px 0",
  color: theme.palette.text.primary,
}));

function Cart() {
  const userId = useSelector((state) => state.auth.userId);
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  const dispatch = useDispatch();
  const { results, message } = useFetch({
    url: "https://dailydealsbackend-18.onrender.com/",
    id: userId,
  });

  useEffect(() => {
    if (results) {
      dispatch(setCartItemsDetails(results));
    }
  }, [results]);

  if (!cartItemsDetails || !cartItemsDetails.items) {
    return <EmptyCart />;
  }

  return (
    <Div>
      <Title>Cart Details</Title>
      {cartItemsDetails.items.length > 0 && cartItemsDetails ? (
        <CartItemsSummary />
      ) : (
        <EmptyCart />
      )}
    </Div>
  );
}

export default Cart;
