import React from "react";
import { DeliveryDetails } from "../../../utils/homeImage";
import "./Delivery.css";

function Delivery() {
  return (
    <div className="delivery-container">
      {DeliveryDetails.map((delivery) => (
        <div key={delivery.id} className="delivery-item">
          <i className={delivery.class}></i>
          <h3>{delivery.deliveryName}</h3>
          <p>{delivery.deliveryDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default Delivery;
