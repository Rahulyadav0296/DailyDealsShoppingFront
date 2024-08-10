import Rating from "@mui/material/Rating"; // Ensure you have this component available and installed from Material-UI
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dailydealsbackend-9.onrender.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    navigate("/place-order");
  };

  return (
    <div className="product-details">
      <h1 className="product-details__title">Product Details</h1>
      <div className="product-details__content">
        <img
          className="product-details__image"
          src={product.image}
          alt={product.name}
        />
        <h1 className="product-details__name">{product.name}</h1>
        <p className="product-details__price">${product.price}</p>
        <div className="product-details__sizes">
          <h4>Sizes</h4>
          <ul>
            {product.sizes.map((size, index) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
        </div>

        <Rating
          className="product-details__rating"
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
        <button
          className="product-details__cart-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <div className="product-details__user-interaction">
          <div className="product-details__description">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
          <div className="product-details__comments">
            <h4>Comments</h4>
            {product.comments.map((comment, index) => (
              <div key={index} className="comment">
                <p className="comment__user">{comment.user}</p>
                <p className="comment__text">{comment.text}</p>
                <p className="comment__date">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <div className="product-details__reviews">
            <h4>Reviews</h4>
            {product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review__user">{review.user}</p>
                <Rating
                  className="review__rating"
                  name="half-rating-read"
                  defaultValue={review.rating}
                  precision={0.5}
                  readOnly
                />
                <p className="review__text">{review.review}</p>
                <p className="review__date">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
