import React, { useEffect, useState } from "react";
import { testimonials } from "../../../utils/homeImage";
import "./TestimonialsCarousel.css"; // Import the CSS file

function TestimonialsCarousel() {
  const [testIndex, setTestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials-carousel">
      {testimonials.map((test, index) => (
        <div
          key={test.id}
          className={`testimonial-slide ${index === testIndex ? "active" : ""}`}
        >
          {index === testIndex && (
            <div className="testimonial-content">
              <h2 className="testimonial-title">{test.title}</h2>
              <p className="testimonial-review">{test.review}</p>
              <div className="testimonial-author">
                <img
                  className="testimonial-image"
                  src={test.image}
                  alt={test.name}
                />
                <div className="testimonial-author-info">
                  <p className="testimonial-name">{test.name}</p>
                  <p className="testimonial-designation">{test.designation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TestimonialsCarousel;
