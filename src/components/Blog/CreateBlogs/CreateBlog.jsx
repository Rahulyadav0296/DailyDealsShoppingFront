import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import usePostRequest from "../../Hooks/usePostRequest";
import "./CreateBlog.css";
import Form from "./Form/Form";
const socket = io("http://localhost:5000");

function CreateBlog({ setShowCreate }) {
  const [blogs, setBlogs] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const { postRequest, message, loading } = usePostRequest();

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token]);

  const handleBlog = async (e) => {
    e.preventDefault();

    // Ensure the blogs object has values before proceeding
    if (
      !blogs.title ||
      !blogs.content ||
      !blogs.category ||
      !blogs.image ||
      !userId
    ) {
      console.error("Missing required fields.");
      return; // Exit early if required data is missing
    }

    const blogData = {
      authorId: userId,
      title: blogs.title,
      category: blogs.category,
      image: blogs.image,
      content: blogs.content,
    };

    try {
      const response = await postRequest(
        "http://localhost:5000/blog",
        blogData,
        token
      );

      console.log(response);

      if (response) {
        socket.emit("newData", response);
        setBlogs({
          title: "",
          content: "",
          image: "",
          category: "",
        });
        setShowCreate(false);

        navigate("/blog");
      }
    } catch (error) {
      console.error("Error while creating blog:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(blogs),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      navigate("/");

      // Optionally, you can reset the Redux blog state here
      setBlogs({
        title: "",
        content: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Form
        handleBlog={handleBlog}
        handleSave={handleSave}
        handleChange={handleChange}
        blog={blogs}
      />
      {loading && <p>Creating Blog...</p>}
      {message && <p>{message}</p>}
    </>
  );
}

export default CreateBlog;
