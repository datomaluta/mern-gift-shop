import Hero from "../components/home/Hero";
import NewArrivals from "../components/home/NewArrivals";
import PersonalizedGifts from "../components/home/PersonalizedGifts";
import ShopByCategories from "../components/home/ShopByCategories";
import ShopByOccasion from "../components/home/ShopByOccasion";
import Testimonials from "../components/home/Testimonials";
import DefaultLayout from "../layout/DefaultLayout";

const Home = () => {
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
