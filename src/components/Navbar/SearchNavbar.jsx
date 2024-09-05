import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../utils/authSlice";
import "./SearchNavbar.css";

function SearchNavbar() {
  const [search, setSearch] = useState("");
  const products = useSelector((state) => state.auth.products);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    dispatch(setAllProducts(filteredProducts));
    setSearch("");
  };
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
    </form>
  );
}

export default SearchNavbar;
