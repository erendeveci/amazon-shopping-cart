import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addItemToDatabase = createAsyncThunk(
  "addFetchData",
  async (productCart) => {
    try {
      const response = await axios.put(
        "https://react-f35c2-default-rtdb.firebaseio.com/cart.json",
        {
          items: productCart.items,
          totalQuantity: productCart.totalQuantity,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCartData = createAsyncThunk("fetchCart", async () => {
  try {
    const response = await axios.get(
      "https://react-f35c2-default-rtdb.firebaseio.com/cart.json"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const removeAllCartData = createAsyncThunk(
  "removeCartData",
  async () => {
    try {
      const response = await axios.delete(
        "https://react-f35c2-default-rtdb.firebaseio.com/cart.json"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    isLoading: false,
    error: "",
    changed: false,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        //not existing

        state.items.push({
          productId: newItem.productId,
          productTitle: newItem.productTitle,
          productImage: newItem.productImages[0].image1,
          productPrice: newItem.productPrice,
          quantity: 1,
          totalPrice: newItem.productPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.totalPrice + newItem.productPrice;
      }
    },
    increase(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      state.totalQuantity++;
      state.changed = true;
      existingItem.quantity++;
      existingItem.totalPrice =
        existingItem.totalPrice + existingItem.productPrice;
    },
    decrease(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.productId !== id);
      } else {
        existingItem.quantity--;

        existingItem.totalPrice =
          existingItem.totalPrice - existingItem.productPrice;
      }
    },
  },
  extraReducers: {
    [addItemToDatabase.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [addItemToDatabase.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [addItemToDatabase.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = "Something went wrong!!!";
    },

    [fetchCartData.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [fetchCartData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;

      if (payload === null) return;
      state.items = payload.items;

      state.totalQuantity = payload.totalQuantity;
    },
    [fetchCartData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = "Something went wrong!!!";
    },

    [removeAllCartData.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [removeAllCartData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      
    },
    [removeAllCartData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = "Uups ! Something went wrong";
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
