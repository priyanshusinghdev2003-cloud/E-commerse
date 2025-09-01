import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";

function HomeProduct() {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      fetch("http://localhost:7000/api/product")
        .then((res) => res.json())
        .then((data) => setProducts(data?.products));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="flex-3 h-full overflow-x-hidden scroll-y-auto  ">
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeProduct;
