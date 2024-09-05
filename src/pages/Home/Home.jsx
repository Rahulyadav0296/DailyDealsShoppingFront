import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { images } from "../../utils/homeImage";
import CarouselContent from "./CarouselContent/CarouselContent";
import Delivery from "./Delivery/Delivery";
import Fashion from "./Fashion/Fashion";
import "./Home.css"; // Create and import a CSS file for styling
import LatestNews from "./LatestNews/LatestNews";
import Testimonials from "./Testimonials/Testimonials";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useSelector((state) => state.auth.userId);
  const [account, setAccount] = useState("");

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

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/signup/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response from server is not ok");
          }
          return res.json();
        })
        .then((data) => {
          const fullname = data.firstName + " " + data.lastName;
          console.log("User Details are: ", fullname);
          setAccount(fullname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  console.log(userId);

  return (
    <>
      <h1 class="welcome-message">
        Welcome, <span>{account}</span>!
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
      <Testimonials />
      <LatestNews />
      <Delivery />
    </>
  );
}

export default Home;
