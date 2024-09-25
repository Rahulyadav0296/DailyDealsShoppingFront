import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../utils/authSlice";
import ModalView from "./ModalView";
import FilterProduct from "./Product/FilterProduct/FilterProduct";
import "./Shop.css";
import ShopDetails from "./ShopDetails/ShopDetails";

function Shop() {
  const [open, setOpen] = useState(false);
  const allProducts = useSelector((state) => state.auth.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

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
          <p>No products available</p>
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
