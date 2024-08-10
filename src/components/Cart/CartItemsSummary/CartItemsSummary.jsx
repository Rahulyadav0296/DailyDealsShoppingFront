import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItem,
  setCartItemsDetails,
  setMessage,
} from "../../../utils/authSlice";
import CartItemTitle from "./CartItemTitle/CartItemTitle";
import CartItems from "./CartItems/CartItems";
import "./CartItemsSummary.css";
import CartSummary from "./CartSummary/CartSummary";

function CartItemsSummary() {
  // const { setCartItem, setCartItemsDetails, setMessage, userId } =
  //   useContext(AuthContext);
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(
        setCartItem(
          cartItemsDetails.items.reduce((sum, item) => sum + item.quantity, 0) -
            1
        )
      );
      updateCart(updatedItem);
    }
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    console.log(
      cartItemsDetails.items.reduce((sum, item) => sum + item.quantity, 0)
    );
    dispatch(
      setCartItem(
        cartItemsDetails.items.reduce((sum, item) => sum + item.quantity, 0) + 1
      )
    );
    updateCart(updatedItem);
  };

  const updateCart = (updatedItem) => {
    const updatedItems = cartItemsDetails.items.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    const updatedTotalPrice = updatedItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    dispatch(
      setCartItemsDetails({
        ...cartItemsDetails,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      })
    );
  };

  const handleRemove = (productId) => {
    fetch("https://dailydealsbackend-9.onrender.com/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response is not OK!");
        }
        return res.json();
      })
      .then((data) => {
        const totalQuantity = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        console.log(data);
        dispatch(setCartItem(totalQuantity));
        dispatch(setCartItemsDetails(data));
      })
      .catch((err) => {
        dispatch(setMessage("Something is wrong in removing the cart!"));
        console.log(err);
      });
  };
  return (
    <>
      <div className="cart-content-details">
        <div className="cart-content">
          <div className="cart-items">
            <CartItemTitle />
            {cartItemsDetails.items.map((item) => {
              const product = item.product;
              return (
                <CartItems
                  key={item._id}
                  item={item}
                  product={product}
                  handleDecrement={() => {
                    handleDecrement(item);
                  }}
                  handleIncrement={() => {
                    handleIncrement(item);
                  }}
                  handleRemove={() => handleRemove(product._id)}
                />
              );
            })}
          </div>
          <CartSummary />
        </div>
      </div>
    </>
  );
}

export default CartItemsSummary;
