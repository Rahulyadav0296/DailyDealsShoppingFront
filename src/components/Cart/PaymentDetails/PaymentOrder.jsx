import { styled } from "@mui/material/styles";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CardDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
}));

const FormGroup = styled("div")(({ theme }) => ({
  width: "100%",
  "& label": {
    display: "block",
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  "& input, & .card-number, & .card-detail-input": {
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
}));

const FormGroupExpireCvv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

const PolicyText = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  textAlign: "center",
  "& .policy-link": {
    color: "#3f51b5",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const PayButton = styled("button")(({ theme }) => ({
  backgroundColor: "#ff9800",
  color: "#fff",
  padding: theme.spacing(2, 4),
  fontSize: "1em",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#fb8c00",
  },
  "&:focus": {
    outline: "none",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
}));

const PaymentMessage = styled("p")(({ theme }) => ({
  color: "#d32f2f",
  fontSize: "1.1em",
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

function PaymentOrder() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const cartItemsDetails = useSelector((state) => state.auth.cartItemsDetails);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Nothing is printing");
      return;
    }

    const cardElement = elements.getElement(
      CardCvcElement,
      CardExpiryElement,
      CardNumberElement
    );
    console.log(cardElement);
    try {
      const response = await fetch(
        "https://dailydealsbackend-9.onrender.com/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItemsDetails.items,
            userId: userId,
          }),
        }
      );

      const { clientSecret } = await response.json();
      console.log(clientSecret);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name || "Anonymous", // Replace with actual customer name
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/order-confirm");
        }
      }
    } catch (error) {
      setMessage("Payment failed");
      console.error(error);
    }
  };

  return (
    <CardDetails>
      <FormGroup>
        <label htmlFor="card-number">Card Number</label>
        <CardNumberElement
          className="card-number"
          id="card-number"
          placeholder="CARD NUMBER"
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <FormGroupExpireCvv>
          <div className="expire-date">
            <label htmlFor="expire-date">Expire Date</label>
            <CardExpiryElement
              id="expire-date"
              className="card-detail-input"
              placeholder="MM/YY"
            />
          </div>
          <div className="security-code">
            <label htmlFor="security-code">Security Code</label>
            <CardCvcElement
              id="security-code"
              className="card-detail-input"
              placeholder="CVV"
            />
          </div>
        </FormGroupExpireCvv>
        <PolicyText>
          By submitting this form, I agree to the{" "}
          <span className="policy-link">
            <Link to="https://stripe.com/in/privacy" target="_blank">
              Policies
            </Link>
          </span>{" "}
          and{" "}
          <span className="policy-link">
            <Link
              to="https://stripe.com/in/legal/payment-terms#:~:text=Stripe%20may%20add%20or%20remove,cease%20offering%20the%20payment%20method."
              target="_blank"
            >
              Terms and conditions
            </Link>
          </span>
        </PolicyText>
      </FormGroup>
      <PayButton onClick={handleSubmit} type="submit" disabled={!stripe}>
        Pay ${cartItemsDetails && cartItemsDetails.totalPrice?.toFixed(2)}
      </PayButton>
      <PaymentMessage>{message}</PaymentMessage>
    </CardDetails>
  );
}

export default PaymentOrder;
