import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePostRequest from "../../Hooks/usePostRequest";
import "./RateReview.css";
import ReviewContainer from "./ReviewContainer";

function RateReview() {
  const [rating, setRating] = useState(0);
  const [products, setProducts] = useState({
    description: "",
    comment: "",
  });
  const { postRequest, message, loading } = usePostRequest();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const handleStar = (index) => {
    setRating(index + 1); // Set rating based on the clicked star
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postRequest(
        `http://localhost:5000/products/reviews/${id}`, // Directly use product._id
        {
          rating: rating,
          comments: products.comment,
          reviews: products.description,
        },
        token
      );
      console.log("Product reviews is: ", data);
      setProducts({
        description: "",
        comment: "",
      });
      setRating(0); // Reset rating after submission
      toast.success("Review Submitted Successfully!");
    } catch (error) {
      console.error("Error during submission: ", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rate-review-container">
      <h3 className="rate-review-title">Rate this Product</h3>
      <div className="stars-container">
        {[...Array(5)].map((_, index) => (
          <span onClick={() => handleStar(index)} key={index} className="star">
            <StarBorderIcon
              style={{
                color: index < rating ? "#ff6600" : "#ccc", // Highlight stars based on rating
              }}
            />
          </span>
        ))}
      </div>
      <ReviewContainer products={products} handleChange={handleChange} />
      <button className="submit-button" onClick={handleSubmit}>
        {!loading ? "Submit" : "Submitting..."}
      </button>
      <ToastContainer />
    </div>
  );
}

export default RateReview;
