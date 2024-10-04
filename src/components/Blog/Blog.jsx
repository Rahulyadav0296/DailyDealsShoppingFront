import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import Categories from "./BlogCategory/Categories";
import Search from "./BlogCategory/Search";
import CreateBlog from "./CreateBlogs/CreateBlog";
import ShowBlogs from "./ShowBlogs/ShowBlogs";

function Blog() {
  const [searchBlog, setSearchBlog] = useState("");
  const blog = useSelector((state) => state.auth.blog);
  const [showCreate, setShowCreate] = useState(false);
  const [filterBlogs, setFilterBlogs] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setFilterBlogs(blog);
  }, [blog]);

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token]);

  const handleChange = (e) => {
    setSearchBlog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlogs = blog.filter((blog) =>
      blog.category.toLowerCase().includes(searchBlog.toLowerCase())
    );
    setSearchBlog("");
    setFilterBlogs(newBlogs);
  };

  return (
    <div className="blog-container">
      <div className="blog-container-filter">
        <Search
          searchBlog={searchBlog}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Categories setFilterBlogs={setFilterBlogs} />
      </div>
      <div>
        <div className="home-container">
          {/* Create New Blog Button */}
          <button
            className="create-blog-btn"
            onClick={() => {
              setShowCreate(!showCreate);
            }}
          >
            {showCreate ? "Hide Create Blog" : "Create Blog"}
          </button>

          {/* Show Create Blog Form */}
          {showCreate && (
            <div className="create-blog-section">
              <CreateBlog setShowCreate={setShowCreate} />
            </div>
          )}
        </div>
        <div className="blogs-section">
          <ShowBlogs
            filterBlogs={filterBlogs}
            setFilterBlogs={setFilterBlogs}
          />
        </div>
      </div>
    </div>
  );
}

export default Blog;
