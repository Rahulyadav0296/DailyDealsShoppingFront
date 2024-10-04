import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../../utils/authSlice";
import useFetch from "../Hooks/useFetch";
import ModalView from "./ModalView";
import FilterProduct from "./Product/FilterProduct/FilterProduct";
import "./Shop.css";
import ShopDetails from "./ShopDetails/ShopDetails";

function Shop() {
  const [open, setOpen] = useState(false);
  const allProducts = useSelector((state) => state.auth.allProducts);
  const dispatch = useDispatch();
  const { results, message } = useFetch({
    url: "https://dailydealsbackend-18.onrender.com/products",
    id: null,
  });
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // More readable null or undefined check
      navigate("/signin");
    }
  }, [token, navigate]); // Also add `navigate` to dependency array

  useEffect(() => {
    if (results && results.length > 0) {
      // Ensure there are actual results
      dispatch(setProducts(results));
    }
  }, [dispatch, results]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      {/* Filter condition */}
      <FilterProduct />
      <div className="shop">
        {allProducts && allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ShopDetails
              product={product}
              setOpen={setOpen}
              key={product._id}
            />
          ))
        ) : (
          <p>{message}</p>
        )}
        <ModalView
          message="Item added Successfully!"
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}

export default Shop;
