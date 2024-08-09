import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutoComplete from "./AddressAutoComplete";

const Div = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "600px",
  margin: "30px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Button = styled("button")(({ theme }) => ({
  backgroundColor: "#ff9800",
  color: "#fff",
  padding: "15px 30px",
  fontSize: "1em",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#fb8c00",
  },
  "&:focus": {
    outline: "none",
  },
}));

function Address() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const handleConfirmAddress = () => {
    navigate("/payment-order");
  };
  return (
    <Div className="address-item">
      <h1>Delivery Address</h1>
      <AddressAutoComplete setShowButton={setShowButton} />
      {showButton && (
        <Button
          onClick={handleConfirmAddress}
          className="pay-button"
          type="submit"
        >
          Confirm Address
        </Button>
      )}
    </Div>
  );
}

export default Address;
