import React from "react";

function OrderItems(props) {
  return (
    <div>
      <img src={props.product.image} alt={props.product.name} />
      <div>
        <h4>{props.product.name}</h4>
        <p>{props.product.description}</p>
      </div>
      <p>
        <strong>&#8377;</strong> {props.product.price}
      </p>
    </div>
  );
}

export default OrderItems;
