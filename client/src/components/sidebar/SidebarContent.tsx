import Logo from "../ui/Logo";
import { RxDashboard } from "react-icons/rx";
import { SlBasket } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiCommentDots } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../../redux/slices/userSlice";

const SidebarContent = ({
  setSidebarIsOpen,
}: {
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
  });

  return (
    <>
      <div className="flex justify-between">
        <Logo white />
        <button className="lg:hidden" onClick={() => setSidebarIsOpen(false)}>
          <IoMdClose className="text-3xl text-gray-300" />
        </button>
      </div>
      <nav className="mt-20">
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition-all ${
                  isActive ? "bg-navy-blue" : ""
                }`
              }
              to="/admin/dashboard"
            >
              <RxDashboard className="text-xl" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition-all ${
                  isActive ? "bg-navy-blue" : ""
                }`
              }
              to="/admin/products"
            >
              <SlBasket className="text-xl" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition-all ${
                  isActive ? "bg-navy-blue" : ""
                }`
              }
              to="/admin/users"
            >
              <HiOutlineUsers className="text-xl" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition-all ${
                  isActive ? "bg-navy-blue" : ""
                }`
              }
              to="/admin/reviews"
            >
              <BiCommentDots className="text-xl" />
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => {
          logoutMutate();
          dispatch(saveUserInfo(null));
        }}
        className="flex gap-2 bg-navy-blue p-2 rounded opacity-50 hover:opacity-100 items-center mt-auto "
      >
        <CiLogout />
        Log out
      </button>
    </>
  );
};

export default SidebarContent;
