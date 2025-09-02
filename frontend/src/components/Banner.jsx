import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "../context/product";

function Banner() {
  const getRandomProduct = useProductStore((state) => state.getRandomProduct);
  const randomProduct = useProductStore((state) => state.randomProduct);
  const [index, setIndex] = useState(0);

  const getRandomProducts = async () => {
    const res = await fetch(
      "http://localhost:7000/api/product/random-products",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    getRandomProduct(data?.products);
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  // Auto change banner
  useEffect(() => {
    if (!randomProduct?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % randomProduct.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [randomProduct]);

  return (
    <div className="h-[70vh] w-full overflow-hidden relative bg-gray-100 text-black">
      <AnimatePresence mode="wait">
        {randomProduct?.length > 0 && (
          <motion.div
            key={randomProduct[index]?._id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-full flex gap-6 items-center justify-center px-10"
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-md z-10"
            >
              <h1 className="text-4xl font-bold text-gray-800  mb-4">
                {randomProduct[index]?.name}
              </h1>
              <p className="text-gray-600  mb-3 line-clamp-3">
                {randomProduct[index]?.description}
              </p>
              <p className="text-sm font-medium text-violet-500">
                {randomProduct[index]?.category}
              </p>
            </motion.div>

            {/* Image */}
            <motion.img
              key={randomProduct[index]?.images[0]}
              src={randomProduct[index]?.images[0]}
              alt={randomProduct[index]?.name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className=" w-2/3 object-cover rounded-xl shadow-lg"
            />
            <div className="flex items-center gap-2 absolute bottom-0 mb-5">
              <div
                className={`h-3 w-3 rounded-full ${
                  index == 0 ? "bg-gray-400" : "bg-gray-800"
                }`}
              ></div>
              <div
                className={`h-3 w-3 rounded-full ${
                  index == 1 ? "bg-gray-400" : "bg-gray-800"
                }`}
              ></div>
              <div
                className={`h-3 w-3 rounded-full ${
                  index == 2 ? "bg-gray-400" : "bg-gray-800"
                }`}
              ></div>
              <div
                className={`h-3 w-3 rounded-full ${
                  index == 3 ? "bg-gray-400" : "bg-gray-800"
                }`}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Banner;
