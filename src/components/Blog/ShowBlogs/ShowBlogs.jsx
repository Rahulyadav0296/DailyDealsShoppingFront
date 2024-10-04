import { Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog, setEditBlog } from "../../../utils/authSlice";
import { getDate } from "../../../utils/dateUtils";
import useFetch from "../../Hooks/useFetch";
import BlogModal from "../Modal/BlogModal";
import "./ShowBlogs.css";

function ShowBlogs({ filterBlogs, setFilterBlogs }) {
  const userId = useSelector((state) => state.auth.userId);
  const blog = useSelector((state) => state.auth.blog);
  const modalRef = useRef();
  const [open, setOpen] = useState(false);
  const [blogContent, setBlogContent] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { results } = useFetch({
    url: "https://dailydealsbackend-26.onrender.com/blog",
    id: userId,
  });

  useEffect(() => {
    if (userId !== null) {
      dispatch(setBlog(results));
    } else {
      navigate("/signin");
    }
  }, [results, userId, navigate]);

  useEffect(() => {
    setFilterBlogs(blog);
  }, [blog]);

  const handleBlogById = (id) => {
    const filterBlog = blog.find(
      (blogDetails, index) => blogDetails._id === id
    );
    setBlogContent(filterBlog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    const blogItem = blog.find((b, index) => b._id === id);
    setBlog(blogItem);
    setEditBlog(true);
    navigate(`/blog/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog post");
      }
      const data = await response.json();
      const remainBlogs = blog.filter((blog, index) => blog._id !== id);
      setFilterBlogs(remainBlogs);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="blog-list">
      {filterBlogs && filterBlogs.length > 0 ? (
        filterBlogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div
              className="blog-image-container"
              onClick={() => {
                handleBlogById(blog._id);
              }}
            >
              <img className="blog-image" src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-content">
              <p className="blog-date">{getDate(blog.createdAt)}</p>
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-description">{blog.content}</p>
              <p className="blog-category">{blog.category}</p>
            </div>
            {/* <div className="blog-actions">
              <button
                className="btn edit-btn"
                onClick={() => {
                  handleEdit(blog._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => {
                  handleDelete(blog._id);
                }}
              >
                Delete
              </button>
            </div> */}
          </div>
        ))
      ) : (
        <p className="loading-message">Loading...</p>
      )}
      {message && <p className="message">{message}</p>}
      <Modal open={open} onClose={handleClose}>
        <BlogModal
          blog={blogContent}
          handleClose={handleClose}
          ref={modalRef}
          open={open}
        />
      </Modal>
    </div>
  );
}

export default ShowBlogs;
