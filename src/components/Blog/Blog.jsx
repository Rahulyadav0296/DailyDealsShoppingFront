import React, { useState } from "react";
import { blogs } from "../../utils/blogs";
import "./Blog.css";
import Categories from "./BlogCategory/Categories";
import Search from "./BlogCategory/Search";
import PaginationBlog from "./PaginationBlog";

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
      <div>
        <Search
          searchBlog={searchBlog}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Categories setFilterBlogs={setFilterBlogs} />
      </div>
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
    </div>
  );
}

export default Blog;
