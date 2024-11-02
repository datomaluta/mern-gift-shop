import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  products: { product: any; quantity: number }[];
  cartIsOpen: boolean;
  totalQuantity: number;
}

const initialState: CartState = {
  products: [],
  cartIsOpen: false,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    toggleCart: (state) => {
      state.cartIsOpen = !state.cartIsOpen;
    },
    // add product to cart
    addToCart: (state, { payload }) => {
      const existingProduct = state.products.find(
        ({ product }) => product.id === payload.id
      );

      if (!existingProduct) {
        state.products.push({ product: { ...payload }, quantity: 1 });
      } else {
        existingProduct.quantity++;
      }

      state.totalQuantity++;
    },

    // remove product from cart
    removeFromCart: (state, { payload }) => {
      state.products = state.products.filter(
        ({ product }) => product.id !== payload.product.id
      );

      state.totalQuantity = state.totalQuantity - payload.quantity;
    },

    // reduce quantity to product in cart
    reduceQuantity: (state, { payload }) => {
      const existingProduct = state.products.find(
        ({ product }) => product.id === payload.id
      );

      if (existingProduct) {
        if (existingProduct?.quantity === 1) {
          state.products = state.products.filter(
            ({ product }) => product.id !== payload.id
          );
        } else {
          existingProduct.quantity--;
        }
      }

      state.totalQuantity--;
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, reduceQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
