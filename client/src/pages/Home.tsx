import { useSelector } from "react-redux";
import Hero from "../components/home/Hero";
import NewArrivals from "../components/home/NewArrivals";
import PersonalizedGifts from "../components/home/PersonalizedGifts";
import ShopByCategories from "../components/home/ShopByCategories";
import ShopByOccasion from "../components/home/ShopByOccasion";
import Testimonials from "../components/home/Testimonials";
import DefaultLayout from "../layout/DefaultLayout";
import { RootState } from "../redux/store";

const Home = () => {
  const { products } = useSelector((state: RootState) => state.cart);
  console.log(products);
  return (
    <DefaultLayout>
      <Hero />
      <NewArrivals />
      <ShopByCategories />
      <ShopByOccasion />
      <PersonalizedGifts />
      <Testimonials />
    </DefaultLayout>
  );
};

export default Home;
