import React, { useEffect, useState } from "react";

import ModalView from "./ModalView";
import FilterProduct from "./Product/FilterProduct/FilterProduct";
import "./Shop.css";
import ShopDetails from "./ShopDetails/ShopDetails";

function Shop() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleClose() {
    setOpen(false);
  }

  setTimeout(() => {
    handleClose();
  }, 1000);

  return (
    <>
      {/* Filter condition */}
      <FilterProduct setProducts={setProducts} products={products} />
      <div className="shop">
        {products.length > 0 ? (
          products.map((product) => (
            <ShopDetails
              key={product._id}
              product={product}
              setOpen={setOpen}
            />
          ))
        ) : (
          <p className="no-products">No Products Available....</p>
        )}
        <ModalView
          message="Item added Successfully!"
          open={open}
          onClose={handleClose}
        />
      </div>
    </>
  );
}

export default Shop;
