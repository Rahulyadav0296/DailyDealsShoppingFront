import React, { lazy, Suspense, useEffect, useState } from "react";

import ModalView from "./ModalView";
import FilterProduct from "./Product/FilterProduct/FilterProduct";
import "./Shop.css";

const ShopDetails = lazy(() => import("./ShopDetails/ShopDetails"));

function Shop() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://dailydealsbackend-9.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
      <FilterProduct setProducts={setProducts} products={products} />
      <div className="shop">
        {products.length > 0 ? (
          products.map((product) => (
            <Suspense
              key={product._id}
              fallback={<div>Loading...please wait</div>}
            >
              <ShopDetails product={product} setOpen={setOpen} />
            </Suspense>
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
