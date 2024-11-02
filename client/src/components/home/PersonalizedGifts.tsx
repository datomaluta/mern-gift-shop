import AnimatedDivForLanding from "../shared/AnimatedDivForLanding";
import ProductCard from "../shared/ProductCard";

const PersonalizedGifts = () => {
  return (
    <AnimatedDivForLanding>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold tracking-wide">Personalized Gifts</h1>
        <span className="bg-secondary w-10 h-[6px]"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 mt-10 place-items-center">
        <ProductCard
          product={{
            id: 5,
            name: "Product 5",
            price: 100,
            image: "https://picsum.photos/200/300",
          }}
        />
        <ProductCard
          product={{
            id: 6,
            name: "Product 6",
            price: 200,
            image: "https://picsum.photos/200/300",
          }}
          sale
        />
        <ProductCard
          product={{
            id: 7,
            name: "Product 7",
            price: 300,
            image: "https://picsum.photos/200/300",
          }}
        />
        <ProductCard
          product={{
            id: 8,
            name: "Product 8",
            price: 400,
            image: "https://picsum.photos/200/300",
          }}
        />
      </div>
    </AnimatedDivForLanding>
  );
};

export default PersonalizedGifts;
