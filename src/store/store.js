import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: { product: productSlice.reducer, cart: cartSlice.reducer },
});

export default store;
