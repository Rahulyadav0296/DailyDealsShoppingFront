import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentOrder from "./PaymentDetails/PaymentOrder";

const Form = styled("form")(({ theme }) => ({
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

const PaymentOptions = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  margin: "20px 0",
}));

const PaymentDetails = styled("div")(({ theme, value }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 30px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: value ? "#4caf50" : "#fff",
  color: value ? "#fff" : "#4caf50",
  border: `2px solid ${value ? "#4caf50" : "#ccc"}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s, color 0.3s, border 0.3s",
  "&:hover": {
    backgroundColor: value ? "#45a049" : "#f0f0f0",
    color: value ? "#fff" : "#4caf50",
  },
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

const PaymentForm = () => {
  const [cardPayment, setCardPayment] = useState(true);
  const navigate = useNavigate();

  const handleCreditCard = () => setCardPayment(true);
  const handleCash = () => setCardPayment(false);
  const handleOrderPlace = (e) => {
    e.preventDefault();
    navigate("/order-confirm");
  };

  return (
    <Form className="payment-form">
      <PaymentOptions className="payment-options">
        <PaymentDetails value={cardPayment} onClick={handleCreditCard}>
          <CreditCardIcon /> Card
        </PaymentDetails>
        <PaymentDetails value={!cardPayment} onClick={handleCash}>
          <AccountBalanceWalletIcon /> Cash
        </PaymentDetails>
      </PaymentOptions>
      {cardPayment ? (
        <PaymentOrder />
      ) : (
        <Button onClick={handleOrderPlace} className="pay-button" type="submit">
          Order Place
        </Button>
      )}
    </Form>
  );
};

export default PaymentForm;
