import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: { navbarIsOpen: false },
  reducers: {
    toggleNavbar: (state) => {
      state.navbarIsOpen = !state.navbarIsOpen;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
