import React from "react";

function Input({ name, value, placeholder, onChange }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
      required
    />
  );
}

export default Input;
