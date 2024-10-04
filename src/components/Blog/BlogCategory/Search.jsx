import React from "react";
import "./Search.css"; // Import the CSS file

function Search({ searchBlog, onChange, onSubmit }) {
  return (
    <form className="search-container" onSubmit={onSubmit}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        value={searchBlog}
        onChange={onChange}
        className="search-input"
      />
    </form>
  );
}

export default Search;
