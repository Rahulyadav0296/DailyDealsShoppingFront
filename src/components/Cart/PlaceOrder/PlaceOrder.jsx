import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../CheckoutForm";
import "./PlaceOrder.css";
const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
); // Replace with your actual Stripe publishable key

function PlaceOrder() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default PlaceOrder;
