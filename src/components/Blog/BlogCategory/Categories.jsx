import React from "react";
import { blogs } from "../../../utils/blogs";
import "./Categories.css";
const countCategories = (blogs) => {
  const categoryCounts = {};

  blogs.forEach((blog) => {
    blog.category.split(", ").forEach((category) => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });
  return categoryCounts;
};

const categoryCounts = countCategories(blogs);

function Categories({ setFilterBlogs }) {
  const handleCategory = (category) => {
    const newBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(category.toLowerCase())
    );
    setFilterBlogs(newBlogs);
  };
  return (
    <div className="categories-container">
      <h3 className="categories-title">Category</h3>
      {Object.entries(categoryCounts).map(([category, count]) => (
        <div
          key={category}
          className="category-item"
          onClick={() => {
            handleCategory(category);
          }}
        >
          <strong className="category-name">{category}</strong>
          <span className="category-count">{`(${count})`}</span>
        </div>
      ))}
    </div>
  );
}

export default Categories;
