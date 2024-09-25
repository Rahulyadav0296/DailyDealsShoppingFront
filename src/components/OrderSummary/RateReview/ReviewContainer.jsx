import React from "react";

function ReviewContainer({ products, handleChange }) {
  return (
    <div className="review-container">
      <h3 className="review-title">Review this Product</h3>
      <div className="review-form">
        <label className="review-label">Description:</label>
        <textarea
          className="review-textarea"
          value={products.description}
          onChange={handleChange}
          name="description"
          placeholder="Description..."
        />
        <label className="review-label">Title:</label>
        <input
          type="text"
          className="review-input"
          name="comment"
          value={products.comment}
          onChange={handleChange}
          placeholder="Title..."
        />
      </div>
    </div>
  );
}

export default ReviewContainer;
