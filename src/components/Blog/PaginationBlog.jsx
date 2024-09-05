import React from "react";
import "./PaginationBlog.css"; // Import the CSS file
import PaginationControl from "./PaginationControl";

// create the number of page

function PaginationBlog({
  currentBlogs,
  currentPage,
  totalPages,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="pagination-details">
      <div className="pagination-blog">
        {currentBlogs.map((blog) => (
          <PaginationControl blog={blog} key={blog.id} />
        ))}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default PaginationBlog;
