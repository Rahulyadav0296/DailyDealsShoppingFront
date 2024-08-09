import React, { useState } from "react";
import "./PaginationControl.css";

function PaginationControl({ blog }) {
  const [commnetDetails, setCommentDetails] = useState(false);
  console.log(blog);

  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <p className="blog-date">{blog.date}</p>
      <h5 className="blog-title">{blog.title}</h5>
      <p className="blog-description">{blog.description}</p>
      <div className="blog-meta">
        <div className="blog-category">
          <i className="fa-solid fa-user"></i>
          <p>{blog.category}</p>
        </div>
        <div className="blog-comments">
          <i className="fa-solid fa-comments"></i>
          <p
            onClick={() => {
              setCommentDetails(!commnetDetails);
            }}
          >
            {blog.comments.length} <span>Comments</span>
          </p>
        </div>
      </div>
      {commnetDetails && (
        <div className="blog-comments-section">
          {blog.comments.map((comment) => (
            <div key={comment.user} className="blog-comment">
              <h5 className="comment-user">{comment.user}</h5>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaginationControl;
