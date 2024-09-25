import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderItems.css"; // Importing the CSS file
const getDate = (date) => {
  const currentDate = new Date();

  const tomorrow = new Date(date);
  tomorrow.setDate(currentDate.getDate() + 1);

  // Add 10 more days to tomorrwo to get the delivery date
  const deliveryDate = new Date(tomorrow);
  deliveryDate.setDate(tomorrow.getDate() + 10);

  // formate the delivery date (day, month, year)
  const day = deliveryDate
    .getDate()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 });
  const month = (deliveryDate.getMonth() + 1).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });
  const year = deliveryDate.getFullYear();
  // console.log(day);
  return `${day}-${month}-${year}`;
};

function OrderItems(props) {
  return (
    <div className="order-item">
      <img
        className="order-item-image"
        src={props.product.image}
        alt={props.product.name}
      />
      <div className="order-item-details">
        <h4 className="order-item-name">{props.product.name}</h4>
        <p className="order-item-description">{props.product.description}</p>
      </div>
      <p className="order-item-price">
        <strong>&#8377;</strong> {props.product.price}
      </p>
      <div>
        <p>Delivered on {getDate(props.date)}</p>
        <Link to={`/products/reviews/${props.product._id}`}>
          <button>
            <span>
              <StarIcon />
            </span>
            Rate & Review Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderItems;
