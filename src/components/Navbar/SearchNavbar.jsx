import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../utils/authSlice";
import "./SearchNavbar.css";

function SearchNavbar() {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const products = useSelector((state) => state.auth.products);
  const [filterProducts, setFilterProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debounceSearch.trim() === "") {
      setFilterProducts([]);
    } else {
      const filteredItems = products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(debounceSearch.toLowerCase());
      });
      console.log(filteredItems);
      setFilterProducts(filteredItems);
    }
  }, [debounceSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log("Items after search navbar", filteredProducts);
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
        <div>
          {filterProducts.map((product, index) => (
            <div id={`${product._id} - ${index}`}>
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default SearchNavbar;
