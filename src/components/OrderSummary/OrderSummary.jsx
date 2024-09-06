import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../utils/authSlice";
import OrderItems from "./OrderItems/OrderItems";

function OrderSummary() {
  const userId = useSelector((state) => state.auth.userId);
  const orders = useSelector((state) => state.auth.orders);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      setMessage("User id is missing");
      return;
    }

    fetch(`http://localhost:5000/${userId}`)
      .then((res) => {
        if (!res.ok) {
          setMessage("Response is not OK!");
          throw new Error("Response is not OK");
        }
        return res.json();
      })
      .then((data) => {
        console.log("The Order Summary is: ", data);
        dispatch(setOrders(data.items));
      })
      .catch((err) => {
        setMessage("The Cart Item is Missing!");
        console.log(err);
      });
  }, [userId]);

  console.log(orders);
  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          const product = order.product;
          return (
            <OrderItems
              key={`${order._id}-${index}`}
              order={order}
              product={product}
            />
          );
        })
      ) : (
        <p>No items in the cart.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderSummary;
