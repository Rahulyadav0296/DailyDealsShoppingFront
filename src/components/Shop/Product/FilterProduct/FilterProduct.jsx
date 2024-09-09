import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../utils/authSlice";
import FilterPrice from "./FilterPrice/FilterPrice";
import "./FilterProduct.css";
import FilterRating from "./FilterRating.jsx/FilterRating";

function FilterProduct() {
  const originalProducts = useSelector((state) => state.auth.products);
  const [filteredProducts, setFilteredProducts] = useState(originalProducts);
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const dispatch = useDispatch();

  // Debounced Price Filter
  const debouncePriceFilter = useMemo(() => {
    let timeOut;
    return (price) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        const newProduct = originalProducts.filter(
          (prev) => prev.price < price
        );
        console.log("Filtered by Price: ", newProduct);
        setFilteredProducts(newProduct); // Store filtered products locally
        dispatch(setProducts(newProduct));
      }, 500);
    };
  }, [originalProducts, dispatch]);

  const handlePriceChange = (e) => {
    const price = e.target.value;
    if (price === 0) {
      dispatch(setProducts(product));
    }
    setPrice(price);
    debouncePriceFilter(price);
  };

  // Handle Check for Ratings
  const handleCheck = useCallback(
    (e) => {
      const { name, checked } = e.target;
      console.log(name, checked);

      setChecked((prev) => ({
        ...prev,
        [name]: checked,
      }));

      // Combine price and rating filters
      const ratingThreshold = Number(name);
      const filteredByRating = originalProducts.filter(
        (product) => product.rating >= ratingThreshold && product.price < price // Apply price condition too
      );

      console.log("Filtered by Rating: ", filteredByRating);
      setFilteredProducts(filteredByRating); // Store filtered products locally
      dispatch(setProducts(filteredByRating));
    },
    [originalProducts, price, dispatch] // Make sure price is included here
  );

  return (
    <div className="filters">
      <h1>FILTERS</h1>
      {/* Price Filter */}
      <FilterPrice price={price} handlePriceChange={handlePriceChange} />

      {/* Rating Filter */}
      <div className="filter-ratings">
        <p>
          <strong>Filter by Ratings</strong>
        </p>
        <form>
          {["1", "2", "3", "4"].map((rating) => (
            <FilterRating
              key={rating}
              checked={checked[`check${rating}`]}
              handleCheck={handleCheck}
              name={rating}
            />
          ))}
        </form>
      </div>
    </div>
  );
}

export default FilterProduct;
