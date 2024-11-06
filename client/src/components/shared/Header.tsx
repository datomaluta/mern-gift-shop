import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { BsFillBasketFill } from "react-icons/bs";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navbarCategoryLinks } from "../../constants";
import { toggleNavbar } from "../../redux/slices/navbarSlice";
import { toggleCart } from "../../redux/slices/cartSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import MobileNavbar from "../ui/MobileNavbar";
import { RootState } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/auth";
import { saveUserInfo } from "../../redux/slices/userSlice";

const Header = () => {
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [userDropDownIsOpen, setUserDropDownIsOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const userButtonRef = useRef<HTMLButtonElement | null>(null);

  useOutsideClick([userDropdownRef, userButtonRef], () => {
    setUserDropDownIsOpen(false);
  });

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
  });

  return (
    <>
      <header className=" text-primary  fixed top-0  w-full left-1/2 -translate-x-1/2 z-40 backdrop-blur-2xl px-4 xl:px-0">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 ">
          <div className=" uppercase text-primary">
            <Link
              to={"/"}
              className="text-2xl font-extrabold font-sans leading-none"
            >
              Regalo
            </Link>
            <p className="tracking-[3.7px] text-xs">Gift Shop</p>
          </div>
          <nav className="font-semibold  gap-10  h-[50px] justify-center items-center hidden lg:flex">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <div className="relative group h-full flex items-center ">
              <p className="flex items-center gap-2 cursor-pointer ">
                Shop by Category <FaChevronDown className="text-xs" />
              </p>
              <div className="bg-white flex-col gap-6 text-sm px-4 py-4 shadow-md border-t-2  border-primary rounded-b absolute top-[100%]  whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all flex pointer-events-none group-hover:pointer-events-auto">
                {navbarCategoryLinks.map((link) => (
                  <Link
                    key={link.id}
                    className="hover:underline hover:text-primary"
                    to={link.href}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
            <Link className="hover:underline" to="/products">
              About Us
            </Link>
            <Link className="hover:underline" to="/products">
              Contact Us
            </Link>
          </nav>
          <MobileNavbar />
          <div className="flex items-center gap-6 lg:gap-7">
            <div className="flex gap-2 relative">
              <button className="hidden lg:inline-block hover:text-tint">
                <MdOutlineSearch className="text-2xl" />
              </button>
            </div>

            <button
              onClick={() => dispatch(toggleNavbar())}
              className="text-2xl lg:hidden "
            >
              <RxHamburgerMenu />
            </button>

            <button
              onClick={() => dispatch(toggleCart())}
              className="flex items-center gap-1 font-medium relative hover:text-tint"
            >
              <BsFillBasketFill className="text-2xl" />
              <span className="bg-primary-tint text-white h-5 w-6 text-[12px]  flex items-center justify-center rounded-full absolute -right-4 -translate-y-1/2">
                {totalQuantity > 9 ? "9+" : totalQuantity}
              </span>
            </button>

            <div className="relative  h-[50px] flex items-center">
              {currentUser ? (
                <>
                  {" "}
                  <button
                    ref={userButtonRef}
                    onClick={() =>
                      setUserDropDownIsOpen((currState) => !currState)
                    }
                    className="hover:text-tint"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  <AnimatePresence>
                    {userDropDownIsOpen && (
                      <motion.div
                        ref={userDropdownRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="bg-white px-4 py-4 rounded absolute top-[100%] right-0 w-[200px] flex gap-4 flex-col"
                      >
                        <Link
                          to={"/profile"}
                          className="flex items-center gap-2"
                        >
                          <FaRegCircleUser className="text-xl" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            logoutMutate();
                            dispatch(saveUserInfo(null));
                          }}
                          className="flex gap-2 items-center border-t pt-3"
                        >
                          <IoLogOutOutline className="text-2xl" />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  className="hover:text-tint border-primary border px-2 py-1 rounded hover:bg-primary hover:text-white"
                  to={"/signin"}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
