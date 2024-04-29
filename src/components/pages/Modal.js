import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute bg-white p-6 rounded-lg shadow-lg">
            {children}
            <button
              className="absolute top-0 right-0 m-3 text-gray-600"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
