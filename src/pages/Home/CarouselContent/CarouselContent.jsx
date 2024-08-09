import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../utils/homeImage";
import "./CarouselContent.css";

function CarouselContent({ currentIndex }) {
  const [animateCaption, setAnimateCaption] = useState(false);

  useEffect(() => {
    setAnimateCaption(false);
    const timer = setTimeout(() => {
      setAnimateCaption(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="carousel-content">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
        >
          {index === currentIndex && (
            <img src={image.image} alt={image.description} />
          )}
        </div>
      ))}
      {animateCaption && (
        <div className="carousel-caption animate">
          <h3>
            <em>Fashion Sale</em>
          </h3>
          <h1>Minimal Menz Style</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            corporis. Dolorem sit aspernatur tempora quisquam provident minus
            voluptatibus dolore.
          </p>
          <Link to="/products">
            <button className="shop-button">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CarouselContent;
