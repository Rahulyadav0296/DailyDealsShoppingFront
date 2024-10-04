import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import Categories from "./BlogCategory/Categories";
import Search from "./BlogCategory/Search";
import CreateBlog from "./CreateBlogs/CreateBlog";
import ShowBlogs from "./ShowBlogs/ShowBlogs";
const PaginationBlog = lazy(() => import("./PaginationBlog"));

const POST_PER_PAGE = 5;

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBlog, setSearchBlog] = useState("");
  const blog = useSelector((state) => state.auth.blog);
  const [filterBlogs, setFilterBlogs] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
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

  // calculate number of pages
  const totalPages = Math.ceil(
    filterBlogs && filterBlogs.length / POST_PER_PAGE
  );

  // calculate the index index range for the current page
  const startIndex = (currentPage - 1) * POST_PER_PAGE;
  const endIndex = startIndex + POST_PER_PAGE;
  const currentBlogs = filterBlogs && filterBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
          <ShowBlogs />
        </div>
        {/* <PaginationBlog
          currentBlogs={currentBlogs}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={() => {
            handlePageChange(currentPage + 1);
          }}
          handlePrev={() => {
            handlePageChange(currentPage - 1);
          }}
        /> */}
      </div>
    </div>
  );
}

export default Blog;
