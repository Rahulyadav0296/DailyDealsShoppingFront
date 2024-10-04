import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItem,
  setCartItemsDetails,
  setMessage,
} from "../../../utils/authSlice";
import usePostRequest from "../../Hooks/usePostRequest";
import CartItemTitle from "./CartItemTitle/CartItemTitle";
import CartItems from "./CartItems/CartItems";
import "./CartItemsSummary.css";
import CartSummary from "./CartSummary/CartSummary";

function CartItemsSummary() {
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { postRequest } = usePostRequest();

  const handleDecrement = (item) => {
    console.log("Cart increment Items are:", item);
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
    const updateTotalQuantity = updatedItems.reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );

    dispatch(
      setCartItemsDetails({
        ...cartItemsDetails,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: updateTotalQuantity,
      })
    );
  };

  const handleRemove = useCallback(
    async (productId) => {
      if (!userId || !productId) {
        console.error("Missing userId or productId");
        dispatch(setMessage("Invalid user or product data!"));
        return;
      }

      const data = await postRequest(
        "https://dailydealsbackend-26.onrender.com/remove",
        {
          userId: userId,
          productId: productId,
        },
        token
      );
      const totalQuantity = data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      dispatch(setCartItem(totalQuantity));

      if (data.items.length === 0) {
        dispatch(
          setCartItemsDetails({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
          })
        );
      } else {
        // Update the cart with the remaining items
        dispatch(
          setCartItemsDetails({
            items: data.items,
            totalPrice: data.totalPrice, // Ensure the backend sends totalPrice
            totalQuantity: totalQuantity,
          })
        );
      }
    },
    [userId, dispatch]
  );
  return (
    <>
      <div className="cart-content-details">
        <div className="cart-content">
          <div className="cart-items">
            <CartItemTitle />
            {cartItemsDetails.items.length > 0 ? (
              cartItemsDetails.items.map((item, index) => {
                const product = item.product;

                if (!product || !product.name) {
                  return null;
                }

                return (
                  <CartItems
                    key={`${item._id}-${index}`}
                    item={item}
                    product={product}
                    handleDecrement={() => handleDecrement(item)}
                    handleIncrement={() => handleIncrement(item)}
                    handleRemove={() => handleRemove(product._id)}
                  />
                );
              })
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
          <CartSummary />
        </div>
      </div>
    </>
  );
}

export default CartItemsSummary;
