import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsDetails, setMessage } from "../../utils/authSlice";
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
  const cartItem = useSelector((state) => state.auth.cartItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      dispatch(setMessage("User id is missing"));
      return;
    }

    fetch(`http://localhost:5000/${userId}`)
      .then((res) => {
        if (!res.ok) {
          dispatch(setMessage("Response is not OK!"));
          throw new Error("Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.totalQuantity);
        dispatch(setCartItemsDetails(data));
      })
      .catch((err) => {
        dispatch(setMessage("The Cart Item is Missing!"));
        console.log(err);
      });
  }, [userId]);

  if (!cartItemsDetails || !cartItemsDetails.items) {
    return <EmptyCart />;
  }
  console.log("the cart items details", cartItemsDetails);

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
