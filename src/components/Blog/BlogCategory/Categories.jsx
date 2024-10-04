import React from "react";
import { useSelector } from "react-redux";
import "./Categories.css";

function Categories({ setFilterBlogs }) {
  const blog = useSelector((state) => state.auth.blog);

  const handleCategory = (category) => {
    const newBlogs = blog.filter((b) =>
      b.category.toLowerCase().includes(category.toLowerCase())
    );
    console.log("Filtered blog is: ", newBlogs);
    setFilterBlogs(newBlogs);
  };

  const countCategories = (blog) => {
    const categoryCounts = {};

    if (blog && blog.length > 0) {
      blog.forEach((b) => {
        b.category.split(",").forEach((category) => {
          const trimmedCategory = category.trim(); // Trim extra spaces
          if (categoryCounts[trimmedCategory]) {
            categoryCounts[trimmedCategory]++;
          } else {
            categoryCounts[trimmedCategory] = 1;
          }
        });
      });
    }
    return categoryCounts;
  };

  const categoryCounts = countCategories(blog);

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
