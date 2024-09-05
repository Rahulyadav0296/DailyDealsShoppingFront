import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../utils/authSlice";
import FilterPrice from "./FilterPrice/FilterPrice";
import "./FilterProduct.css";
import FilterRating from "./FilterRating.jsx/FilterRating";

function FilterProduct() {
  const products = useSelector((state) => state.auth.products);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPrice(price);
    setTimeout(() => {
      const newProduct = products.filter((prev) => prev.price < price);
      console.log(newProduct);
      dispatch(setProducts(newProduct));
    }, 5000);
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
    const checkedProduct = products.filter(
      (prev) => prev.rating >= Number(name)
    );
    if (checkedProduct.length === 0) {
      <p>Loading...</p>;
    }
    dispatch(setProducts(checkedProduct));
  };

  return (
    <div className="filters">
      <h1>FILTERS</h1>
      <FilterPrice price={price} handlePriceChange={handlePriceChange} />
      <div className="filter-ratings">
        <p>
          <strong>Filter by Ratings</strong>
        </p>
        <form>
          <FilterRating checked={checked} handleCheck={handleCheck} name="3" />
          <FilterRating checked={checked} handleCheck={handleCheck} name="2" />
          <FilterRating checked={checked} handleCheck={handleCheck} name="1" />
          <FilterRating checked={checked} handleCheck={handleCheck} name="4" />
        </form>
      </div>
    </div>
  );
}

export default FilterProduct;
