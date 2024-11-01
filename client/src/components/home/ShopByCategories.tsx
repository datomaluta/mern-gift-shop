import CategoryCard from "../shared/CategoryCard";
import AnimatedDivForLanding from "../shared/AnimatedDivForLanding";
import toysCategory from "./../../assets/images/categories/toys-category.jpg";
import accessoriesCategory from "./../../assets/images/categories/accessories-category.jpg";
import clothingCategory from "./../../assets/images/categories/clothing-category.jpg";
import handbagsCategory from "./../../assets/images/categories/handbags-category.jpg";
import walletsCategory from "./../../assets/images/categories/wallets-category.jpg";
import officeCategory from "./../../assets/images/categories/office-category.jpg";

const ShopByCategories = () => {
  return (
    <AnimatedDivForLanding>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold tracking-wide">Shop by Categories</h1>
        <span className="bg-secondary w-10 h-[6px]"></span>
      </div>

      <div className="grid grid-cols-1 place-items-center mt-10 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        <CategoryCard
          href={"/categories/toys"}
          color={"bg-lime-100"}
          title={"Toys"}
          image={toysCategory}
        />

        <CategoryCard
          href={"/categories/accessories"}
          color={"bg-amber-100"}
          title={"Accessories"}
          image={accessoriesCategory}
        />

        <CategoryCard
          href={"/categories/clothing"}
          color={"bg-orange-100"}
          title={"Clothing"}
          image={clothingCategory}
        />

        <CategoryCard
          href={"/categories/handbags"}
          color={"bg-yellow-100"}
          title={"Handbags"}
          image={handbagsCategory}
        />

        <CategoryCard
          href={"/categories/wallets"}
          color={"bg-orange-100"}
          title={"Wallets"}
          image={walletsCategory}
        />

        <CategoryCard
          href={"/categories/office"}
          color={"bg-blue-100"}
          title={"Office"}
          image={officeCategory}
        />
      </div>
    </AnimatedDivForLanding>
  );
};

export default ShopByCategories;
