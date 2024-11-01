"use client";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import CartContent from "./CartContent";
import { RootState } from "../../redux/store";
import { toggleCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const { cartIsOpen } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  console.log(cartIsOpen);

  return (
    <>
      <AnimatePresence>
        {cartIsOpen ? (
          <div className="z-50 fixed top-0 right-0 w-full h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0  h-screen w-full bg-black bg-opacity-60 "
              onClick={() => dispatch(toggleCart())}
            ></motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 right-0 w-full lg:w-1/3 h-[75vh] lg:h-screen bg-white lg:flex flex-col hidden"
            >
              <CartContent />
            </motion.div>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 right-0 w-full lg:w-1/3 h-[75vh] lg:h-screen bg-white flex flex-col lg:hidden"
            >
              <CartContent />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Cart;
