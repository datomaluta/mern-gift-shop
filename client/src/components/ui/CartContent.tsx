import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  reduceQuantity,
  removeFromCart,
  toggleCart,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

const CartContent = () => {
  const { products } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-neutral-300 flex justify-between items-center">
        <p className="font-medium">Shopping Cart</p>
        <button onClick={() => dispatch(toggleCart())}>
          <IoMdClose className="text-2xl" />
        </button>
      </div>
      {/* Products List */}
      <div className="flex flex-col gap-5 p-4 h-[400px]  overflow-y-auto">
        {products.length ? (
          products.map(({ product, quantity }) => (
            <div
              key={product?.id}
              className="border-b border-neutral-300 last:border-none pb-5 flex justify-between"
            >
              {/* Product Details */}
              <div className="flex gap-3 items-center">
                <div className="w-16 h-16 shrink-0">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="object-cover w-full h-full rounded shrink-0"
                  />
                </div>

                <div className="flex flex-col gap-2 justify-between">
                  <p className="text-sm font-medium">{product?.name}</p>
                  <div className="flex items-center">
                    <button
                      className="border-neutral-300 border w-7 h-7 lg:w-8 lg:h-8 hover:bg-primary hover:text-white transition-all"
                      onClick={() => dispatch(reduceQuantity(product))}
                    >
                      -
                    </button>
                    <div className="border-neutral-300 border-y min-w-7 h-7 lg:w-8 lg:h-8 outline-none text-center text-sm flex justify-center items-center">
                      {quantity}
                    </div>
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="border-neutral-300 border w-7 h-7 lg:w-8 lg:h-8 hover:bg-primary hover:text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Price */}
              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ product, quantity }))
                  }
                  className="text-neutral-400 hover:text-primary"
                >
                  <IoIosCloseCircleOutline className="text-2xl transition-all" />
                </button>
                <p>${(product?.price * quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="mt-auto shadow-xl">
        <div className="border-y border-neutral-300 p-4 flex justify-between items-center">
          <p>Subtotal:</p>
          <p>
            $
            {products
              .reduce(
                (total, { product, quantity }) =>
                  total + product.price * quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>

        <div className=" p-4 flex flex-col gap-4 text-sm tracking-widest">
          <Link
            className="bg-primary py-2 text-white block text-center  font-medium"
            to={"/cart"}
          >
            View Cart
          </Link>

          <Link
            className="bg-primary py-2 text-white block text-center  font-medium"
            to={"/cart"}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartContent;
