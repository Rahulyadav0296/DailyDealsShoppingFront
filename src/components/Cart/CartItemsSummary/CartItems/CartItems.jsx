import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import "./CartItems.css";

function CartItems({
  product,
  item,
  handleDecrement,
  handleIncrement,
  handleRemove,
}) {
  if (!product) {
    return null;
  }

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-product-div">
          <img
            src={product.image}
            alt={product.name}
            className="cart-item-image"
          />
          <p className="cart-item-name">{product.name}</p>
        </div>
        <div className="cart-item-price-container">
          <p className="cart-item-price">${product.price?.toFixed(2)}</p>
        </div>
        <div className="cart-item-quantity-container">
          <div className="cart-item-quantity">
            <button onClick={handleDecrement} className="cart-item-decrement">
              -
            </button>
            <p className="cart-item-quantity-value">{item.quantity}</p>
            <button onClick={handleIncrement} className="cart-item-increment">
              +
            </button>
          </div>
        </div>
        <div className="cart-item-remove-container">
          <button onClick={handleRemove} className="cart-item-remove">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItems;
