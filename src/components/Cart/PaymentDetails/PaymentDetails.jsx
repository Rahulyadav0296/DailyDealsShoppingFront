import React from "react";

function PaymentDetails({ onClick, children, value }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`payment-button ${value ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

export default PaymentDetails;
