import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrders } from "../../utils/authSlice";
import useFetch from "../Hooks/useFetch";
import OrderItems from "./OrderItems/OrderItems";

function OrderSummary() {
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const orders = useSelector((state) => state.auth.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, message } = useFetch({
    url: "https://dailydealsbackend-26.onrender.com/",
    id: userId,
  });

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  useEffect(() => {
    dispatch(setOrders(results));
  }, [results]);
  return (
    <div>
      {orders && orders.items.length > 0 ? (
        orders.items.map((order, index) => {
          const product = order.product;
          return (
            <OrderItems
              key={`${order._id}-${index}`}
              order={order}
              date={orders.createdAt}
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
