import React from "react";
import { useSelector } from "react-redux";
import { blogCategories } from "../../../../utils/blogs";

function Form({ handleBlog, handleSave, handleChange, blog }) {
  const editBlog = useSelector((state) => state.auth.editBlog); // For checking if it's edit mode

  return (
    <>
      <form onSubmit={editBlog ? handleSave : handleBlog} className="blog-form">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Content</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="form-textarea"
        />

        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Choose Category: </label>
        <select
          name="category"
          value={blog.category}
          onChange={handleChange}
          className="form-select"
        >
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit" className="form-button">
          {`${editBlog ? "Save Blog" : "Create Blog"} `}
        </button>
      </form>
    </>
  );
}

export default Form;
