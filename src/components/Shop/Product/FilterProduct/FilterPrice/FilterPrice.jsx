import React from "react";
import "./FilterPrice.css";

function FilterPrice({ price, handlePriceChange }) {
  return (
    <div className="filter-price">
      <p>
        <strong>Filter by Price</strong>
      </p>
      <div className="filter-price-condition">
        <input
          type="range"
          min="1"
          max="1000"
          value={price}
          className="filter-price-input"
          onChange={handlePriceChange}
        />
        <p className="filter-price-paragraph">0 to {price}</p>
      </div>
    </div>
  );
}

export default FilterPrice;
