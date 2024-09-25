import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../components/Hooks/useFetch";
import { images } from "../../utils/homeImage";
import CarouselContent from "./CarouselContent/CarouselContent";
import Delivery from "./Delivery/Delivery";
import Fashion from "./Fashion/Fashion";
import "./Home.css"; // Create and import a CSS file for styling
import LatestNews from "./LatestNews/LatestNews";
import TestimonialsCarousel from "./Testimonials/Testimonials";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useSelector((state) => state.auth.userId);
  const [account, setAccount] = useState("");
  const { results, message } = useFetch({
    url: "http://localhost:5000/users",
    id: userId,
  });

  useEffect(() => {
    let isMounted = true; // track if the component is mounted

    if (results && isMounted) {
      const fullname = `${results.firstName} ${results.lastName}`;
      setAccount(fullname);
    }

    return () => {
      isMounted = false; // clean up the component unmount
    };
  }, [results]);
  // we are preventing the re-execution of the code on every render and its totally depends on teh image.length
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]); // depends on image.length rather than current Index

  return (
    <>
      <h1 className="welcome-message">
        Welcome,{" "}
        <span>{userId !== null ? account : "to Daily Deals"} &#128525;</span>
      </h1>
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
      <TestimonialsCarousel />
      <LatestNews />
      <Delivery />
      {message && <p>{message}</p>}
    </>
  );
}

export default Home;
