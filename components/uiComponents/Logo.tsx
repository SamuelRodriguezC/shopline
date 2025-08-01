"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";

const Logo = () => {
  const [hovered, setHovered] = useState(false);
  const text = "ShopLine";

  return (
    <div
      className="relative inline-block h-10 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Texto base oculto para mantener tamaño */}
      <span className="text-3xl font-extrabold text-gray-900 select-none opacity-0">
        {text}
      </span>

      {/* Letras animadas */}
      <div className="absolute top-0 left-0 flex">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 1 }}
            animate={
              hovered
                ? {
                    opacity: [1, 0, 1],
                    transition: {
                      delay: index * 0.08,
                      duration: 0.4,
                    },
                  }
                : {
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }
            }
            className="text-3xl font-extrabold text-gray-900"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Carrito solo visible mientras hovered */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-[6px] left-0 text-blue-800 text-2xl"
            initial={{ x: -40, opacity: 0 }}
            animate={{
              x: text.length * 19,
              opacity: 1,
              transition: {
                duration: text.length * 0.12,
                ease: "easeInOut",
              },
            }}
            exit={{ opacity: 0 }}
          >
            <FaCartShopping />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;
