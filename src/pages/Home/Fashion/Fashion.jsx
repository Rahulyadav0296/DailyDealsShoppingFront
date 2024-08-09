import React from "react";
import { Link } from "react-router-dom";
import { fashionImage } from "../../../utils/homeImage";
import "./Fashion.css";

function Fashion() {
  return (
    <div className="fashion-gallery">
      {fashionImage.map((fashion) => (
        <div key={fashion.id} className="fashion-item">
          <div className="image-container">
            <img
              src={fashion.image}
              alt={fashion.title}
              className="fashion-image"
            />
            <h3 className="fashion-title">{fashion.title}</h3>
            <div className="overlay">
              <Link to="/products">
                <button className="shop-button">{fashion.shop}</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fashion;
