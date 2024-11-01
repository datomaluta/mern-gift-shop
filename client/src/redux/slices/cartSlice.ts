import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartIsOpen: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.cartIsOpen = !state.cartIsOpen;
    },
    // add product to cart
    // addToCart: (state, action) => {
    //   const existingProduct = state.products.find(
    //     (product) => product.id === action.payload.id
    //   );

    //   if (!existingProduct) {
    //     state.products.push({ ...action.payload, quantity: 1 });
    //   } else {
    //     existingProduct.quantity++;
    //   }
    // },

    // remove product from cart

    // add quantity to product in cart

    // reduce quantity to product in cart
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
