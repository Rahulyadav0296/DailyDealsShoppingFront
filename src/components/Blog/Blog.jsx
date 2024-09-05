import React, { lazy, Suspense, useState } from "react";
import { blogs } from "../../utils/blogs";
import "./Blog.css";
import Categories from "./BlogCategory/Categories";
import Search from "./BlogCategory/Search";
const PaginationBlog = lazy(() => import("./PaginationBlog"));

const POST_PER_PAGE = 5;

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBlog, setSearchBlog] = useState("");
  const [filterBlogs, setFilterBlogs] = useState(blogs);

  // calculate number of pages
  const totalPages = Math.ceil(filterBlogs.length / POST_PER_PAGE);

  // calculate the index index range for the current page
  const startIndex = (currentPage - 1) * POST_PER_PAGE;
  const endIndex = startIndex + POST_PER_PAGE;
  const currentBlogs = filterBlogs.slice(startIndex, endIndex);

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
    const newBlogs = blogs.filter((blog) =>
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
      <Suspense
        fallback={
          <div className="loading-container">
            <img
              src="https://i.giphy.com/jAYUbVXgESSti.webp"
              alt="Loading..."
              className="loading-image"
            />
          </div>
        }
      >
        <PaginationBlog
          currentBlogs={currentBlogs}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={() => {
            handlePageChange(currentPage + 1);
          }}
          handlePrev={() => {
            handlePageChange(currentPage - 1);
          }}
        />
      </Suspense>
    </div>
  );
}

export default Blog;
