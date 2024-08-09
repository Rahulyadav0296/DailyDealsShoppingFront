import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

// const stripePromise = loadStripe("your-publishable-key");

function CheckoutForm({ cartItemsDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.createPayment({
      amount: cartItemsDetails.totalPrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
