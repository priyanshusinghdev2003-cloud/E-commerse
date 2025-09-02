import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDes() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:7000/api/product/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setProduct(data?.product);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mt-12 px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-100 rounded-lg flex justify-center items-center p-6 shadow-md">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="max-h-[450px] object-contain rounded-md"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product?.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-20 h-20 object-cover rounded-md border hover:border-black cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <span className="text-sm text-gray-500">{product?.store?.name}</span>
          <h2 className="text-3xl font-bold text-gray-900">{product?.name}</h2>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-black">${product?.price}</p>
            <p className="text-gray-500 font-medium">{product?.sold} sold</p>
          </div>

          <div className="border-t border-gray-300" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product?.description?.length > 400
                ? product?.description.slice(0, 400) + "..."
                : product?.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer">
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-400 py-3 rounded-md font-semibold hover:bg-gray-100 transition cursor-pointer">
              Checkout Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Related Products
        </h2>
        <div className="flex p-2 gap-6 w-full overflow-x-auto scrollbar-hide">
          {product?.relatedProducts?.map((related) => (
            <Link
              to={`/${related?._id}`}
              key={related?._id}
              className="flex flex-col gap-3 cursor-pointer hover:scale-105 transition duration-300 min-w-[160px]"
            >
              <div className="bg-gray-100 rounded-lg flex justify-center items-center p-4 shadow-sm">
                <img
                  src={related?.images[0]}
                  alt={related?.name}
                  className="w-36 h-36 object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 truncate">
                {related?.name}
              </h3>
              <p className="text-gray-500 text-sm">${related?.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDes;
