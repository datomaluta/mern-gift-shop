import { Tooltip } from "flowbite-react";

import { BsFillBasketFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({
  product,
  sale = false,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  sale?: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-[350px] w-full  overflow-hidden ">
      <div className="group relative">
        <Link to={"/"}>
          <img
            src={product.image}
            alt="product image"
            className="w-full h-[300px] md:h-[250px] object-cover"
          />
        </Link>
        <div className="flex flex-col gap-2 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Tooltip content="Add to cart" placement="left" color="red">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-white rounded-full p-2"
            >
              <BsFillBasketFill className="" />
            </button>
          </Tooltip>
          <Tooltip content="Quick view" placement="left" color="red">
            <button
              onClick={() => console.log("Quick view")}
              className="bg-white rounded-full p-2"
            >
              <FaEye className="" />
            </button>
          </Tooltip>
        </div>
        {sale && (
          <span className="absolute top-4 left-4 bg-white px-2 py-1 rounded-xl text-sm">
            Sale!
          </span>
        )}
      </div>

      <p className="text-gray-400 mt-2 mb-1 text-sm">Wallets</p>
      <Link to={"/"} className="font-bold mb-1 block">
        {product.name}
      </Link>
      {!sale ? (
        <p className=" text-sm font-bold">${product.price}</p>
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative w-max">
            <div className="h-[0.9px] w-auto bg-gray-800 absolute top-1/2 left-0 right-0"></div>
            <p className="text-gray-300 text-sm">$120.00</p>
          </div>
          <p className="font-bold text-sm">$100.00</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
