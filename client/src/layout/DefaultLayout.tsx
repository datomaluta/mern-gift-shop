import Background from "../components/shared/Background";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Cart from "../components/ui/Cart";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Background />
      <main className="max-w-[1200px] mx-auto mt-[90px] px-4 xl:px-0">
        <Cart />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
