import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;

    const x = (offsetY / offsetHeight - 0.5) * 20; // tilt X
    const y = (offsetX / offsetWidth - 0.5) * 20; // tilt Y
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative p-4 rounded-2xl shadow-lg shadow-gray-400 cursor-pointer 
                 bg-white/20 backdrop-blur-md border border-white/30 group"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center"
      >
        <Link to={`/${product?._id}`}>
          <motion.img
            src={product?.images}
            alt={product?.name}
            className="h-36 w-36 object-contain transition-transform duration-300"
          />
        </Link>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-3 text-base font-semibold text-gray-800  text-center"
      >
        {product?.name.length > 25
          ? product?.name.slice(0, 25) + "..."
          : product?.name}
      </motion.h2>

      <p className="mt-1 text-gray-800 text-center font-medium">
        ${product?.price}
      </p>

      <motion.button
        className="mt-3 w-full py-2 rounded-lg shadow-md text-white font-semibold cursor-pointer
        bg-gradient-to-r from-[#527cbf] to-violet-500 
        hover:from-violet-500 hover:to-[#527cbf] transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
}

export default ProductCard;
