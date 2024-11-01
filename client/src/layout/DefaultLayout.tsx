import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Cart from "../components/ui/Cart";
import MobileNavbar from "../components/ui/MobileNavbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto mt-[90px] px-4 xl:px-0">
        <Cart />
        <MobileNavbar />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
