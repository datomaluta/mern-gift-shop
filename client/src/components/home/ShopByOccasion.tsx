import { Link } from "react-router-dom";
import AnimatedDivForLanding from "../shared/AnimatedDivForLanding";

const ShopByOccasion = () => {
  return (
    <AnimatedDivForLanding>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold tracking-wide">Shop by Occasion</h1>
        <span className="bg-secondary w-10 h-[6px]"></span>
      </div>

      <div className="mt-10 grid  grid-cols-1 md:grid-cols-2">
        <div className="bg-birthday bg-cover bg-center flex justify-center items-center flex-col gap-4 h-[250px] md:h-[300px] group">
          <h3 className="text-white text-xl font-bold">Birthday Gifts</h3>
          <Link
            className="p-3 bg-white uppercase inline-block text-sm group-hover:bg-primary transition-all duration-300 group-hover:text-white"
            to={"/categories/birthday"}
          >
            View All
          </Link>
        </div>

        <div className="bg-anniversary bg-cover bg-center flex justify-center items-center flex-col gap-3 h-[250px] md:h-[300px] group">
          <h3 className="text-white text-xl font-bold">Anniversary Gifts</h3>
          <Link
            className="p-3 bg-white uppercase inline-block text-sm group-hover:bg-primary transition-all duration-300 group-hover:text-white"
            to={"/categories/birthday"}
          >
            View All
          </Link>
        </div>

        <div className="bg-graduation bg-cover bg-center flex justify-center items-center flex-col gap-3 h-[250px] md:h-[300px] group">
          <h3 className="text-white text-xl font-bold">Graduations Gifts</h3>
          <Link
            className="p-3 bg-white uppercase inline-block text-sm group-hover:bg-primary transition-all duration-300 group-hover:text-white"
            to={"/categories/birthday"}
          >
            View All
          </Link>
        </div>

        <div className="bg-holidays bg-cover bg-center flex justify-center items-center flex-col gap-3 h-[250px] md:h-[300px] group">
          <h3 className="text-white text-xl font-bold">Holidays Gifts</h3>
          <Link
            className="p-3 bg-white uppercase inline-block text-sm group-hover:bg-primary transition-all duration-300 group-hover:text-white"
            to={"/categories/birthday"}
          >
            View All
          </Link>
        </div>
      </div>
    </AnimatedDivForLanding>
  );
};

export default ShopByOccasion;
