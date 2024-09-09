import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../utils/authSlice";
import "./SearchNavbar.css";

function SearchNavbar() {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const products = useSelector((state) => state.auth.products);
  const [productVisible, setProductVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  // memoized the filtered filter product here
  const filterProducts = useMemo(() => {
    if (debounceSearch.trim() === "") {
      return [];
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [debounceSearch, products]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setProductVisible(true);
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

  const handleProductSearch = (id) => {
    console.log(id);
    const item = filterProducts.filter((item, index) => item._id === id);
    console.log("The item is: ", item[0].name);
    setSearch(item[0].name);
    setProductVisible(false);
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
        {productVisible && (
          <div>
            {filterProducts.length > 0 ? (
              filterProducts.map((product, index) => (
                <div key={`${product._id} - ${index}`}>
                  <p
                    onClick={() => {
                      handleProductSearch(product._id);
                    }}
                  >
                    {product.name}
                  </p>
                </div>
              ))
            ) : (
              <p>No Product Found</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchNavbar;
