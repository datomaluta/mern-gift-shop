import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { IoMenu } from "react-icons/io5";
import SidebarContent from "../components/sidebar/SidebarContent";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([sidebarRef, menuButtonRef], () => {
    setSidebarIsOpen(false);
  });

  return (
    <>
      <aside
        className={`fixed hidden lg:flex left-0 h-screen bg-primary max-w-[300px] w-full transition-all p-4 text-white  flex-col `}
      >
        <SidebarContent setSidebarIsOpen={setSidebarIsOpen} />
      </aside>

      <aside
        ref={sidebarRef}
        className={`fixed flex lg:hidden left-0 h-screen bg-primary max-w-[300px] w-full transition-all p-4 text-white  flex-col ${
          sidebarIsOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent setSidebarIsOpen={setSidebarIsOpen} />
      </aside>

      <header className="lg:ml-[300px] p-4 flex shadow-md">
        <button
          className="lg:hidden"
          onClick={() => setSidebarIsOpen((currentState) => !currentState)}
          ref={menuButtonRef}
        >
          <IoMenu className="text-3xl" />
        </button>

        <div className="w-10 h-10  rounded-full overflow-hidden ml-auto">
          <img
            className="w-full h-full"
            src="https://ps.w.org/one-user-avatar/assets/icon-256x256.png?rev=2536829"
            alt="avatar"
          />
        </div>
      </header>
      <main className="lg:ml-[300px] p-4  min-h-screen transition-all">
        {currentUser?.isAdmin ? <Outlet /> : <Navigate to={"/signin"} />}
      </main>
    </>
  );
};

export default AdminLayout;
