import StarIcon from "@mui/icons-material/StarOutline";
import React from "react";
import "./FilterRating.css";

function FilterRating({ checked, handleCheck, name }) {
  return (
    <div className="filter-rating">
      <input
        type="checkbox"
        name={name}
        value={checked}
        onChange={handleCheck}
      />
      <label htmlFor={name}>
        {Number(name)} <StarIcon /> & above{" "}
      </label>
    </div>
  );
}

export default FilterRating;
