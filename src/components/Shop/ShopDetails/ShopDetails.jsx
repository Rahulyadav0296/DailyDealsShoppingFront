import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartItem } from "../../../utils/authSlice";

function ShopDetails({ product, setOpen }) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const handleCart = async (productId) => {
    try {
      console.log("Sending request to add product to cart:", productId);

      const response = await fetch(
        "https://dailydealsbackend-26.onrender.com/add",
        {
          // Correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            productId: productId,
            quantity: 1, // Set to a valid quantity
          }),
        }
      );

      console.log("Response from server:", response);

      if (!response.ok) {
        navigate("/signin");
        // throw new Error("Response is not working properly!");
      }

      const data = await response.json();
      console.log("Data received from server:", data);
      dispatch(setCartItem(data.totalQuantity));
      setOpen(true);
    } catch (error) {
      console.error("Error handling cart:", error);
    }
  };
  const handleProductDetail = (id) => {
    navigate(`/products/${id}`);
  };
  const handleBuyNow = () => {
    if (userId !== null) {
      navigate("/place-order");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div key={product._id} className="shop__product">
      <div
        className="shop__product-details"
        onClick={() => handleProductDetail(product._id)}
      >
        <img
          className="shop__product-image"
          src={product.image}
          alt={product.name}
        />
        <h5 className="shop__product-name">{product.name}</h5>
        <p className="shop__product-type">{product.type}</p>
        <p className="shop__product-rating">
          <strong>Rating:</strong> {product.rating}/5
        </p>
        <p className="shop__product-price">
          <strong>$</strong> {product.price}
        </p>
      </div>
      <div className="shop-buttons">
        <button className="button-75" onClick={() => handleCart(product._id)}>
          Add To Cart
        </button>
        <button className="button-75" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ShopDetails;
