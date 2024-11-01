"use client";
import { useState } from "react";
import { FaCaretRight, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleNavbar } from "../../redux/slices/navbarSlice";
import { useNavigate } from "react-router-dom";
import { navbarCategoryLinks } from "../../constants";

const MobileNavbar = () => {
  const [categoryDropdownIsOpen, setCategoryDropdownIsOpen] = useState(false);
  const { navbarIsOpen } = useSelector((state: RootState) => state.navbar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = (href: string) => {
    dispatch(toggleNavbar());
    navigate(href);
  };
  return (
    <>
      <AnimatePresence>
        {navbarIsOpen ? (
          <div className="fixed top-0 right-0 left-null w-full h-screen z-50 text-primary lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black bg-opacity-60 w-full h-full fixed top-0"
              onClick={() => dispatch(toggleNavbar())}
            ></motion.div>

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed w-full md:w-2/3  bg-pink-100 h-screen p-4"
            >
              <div className="flex justify-between items-center">
                <div className=" uppercase text-primary">
                  <h1 className="text-2xl font-extrabold font-sans leading-none">
                    Regalo
                  </h1>
                  <p className="tracking-[3.7px] text-xs">Gift Shop</p>
                </div>

                <button onClick={() => dispatch(toggleNavbar())}>
                  <IoMdClose className="text-2xl" />
                </button>
              </div>

              <div className="mt-10  flex flex-col gap-5">
                <button
                  onClick={() => navigateHandler("/")}
                  className="border-b border-neutral-300 pb-1 w-full text-left font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="border-b border-neutral-300 pb-1 w-full text-left font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="border-b border-neutral-300 pb-1 w-full text-left font-medium"
                >
                  Contact Us
                </button>

                <div>
                  <button
                    onClick={() =>
                      setCategoryDropdownIsOpen((currState) => !currState)
                    }
                    className="flex justify-between items-center w-full mb-3 font-medium"
                  >
                    Shop by Category{" "}
                    <FaChevronDown
                      className={`text-sm transition-all ${
                        categoryDropdownIsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {categoryDropdownIsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-2 text-neutral-600"
                      >
                        {navbarCategoryLinks.map((link) => (
                          <button
                            onClick={() => navigate(link.href)}
                            key={link.id}
                            className="text-left pl-4 flex gap-1 items-center hover:underline hover:text-primary group"
                          >
                            <FaCaretRight className="group-hover:text-primary" />

                            {link.text}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
