import AnimatedDivForLanding from "../shared/AnimatedDivForLanding";
import ProductCard from "../shared/ProductCard";

const NewArrivals = () => {
  return (
    <AnimatedDivForLanding>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold tracking-wide">New Arrivals</h1>
        <span className="bg-secondary w-10 h-[6px]"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 mt-10 place-items-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </AnimatedDivForLanding>
  );
};

export default NewArrivals;
