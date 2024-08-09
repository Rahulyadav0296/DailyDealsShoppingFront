import React, { useEffect, useState } from "react";
import { images } from "../../utils/homeImage";
import CarouselContent from "./CarouselContent/CarouselContent";
import Delivery from "./Delivery/Delivery";
import Fashion from "./Fashion/Fashion";
import "./Home.css"; // Create and import a CSS file for styling
import LatestNews from "./LatestNews/LatestNews";
import Testimonials from "./Testimonials/Testimonials";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <main className="carousel">
        <button className="carousel-button prev" onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <CarouselContent currentIndex={currentIndex} />
        <button className="carousel-button next" onClick={nextSlide}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </main>
      <Fashion />
      <Testimonials />
      <LatestNews />
      <Delivery />
    </>
  );
}

export default Home;
