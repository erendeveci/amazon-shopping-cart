import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
  try {
    const response = await axios.get(
      "https://react-f35c2-default-rtdb.firebaseio.com/items.json"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    productCart: [],
    totalQuantity: 0,
    loading: false,
    error: "",
  },
  reducers: {
    
  },
  extraReducers: {
    [fetchProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;

      let loadedProduct = [];

      for (let itemKey in payload) {
        loadedProduct.push({
          productId: itemKey,
          productTitle: payload[itemKey].productTitle,
          productPrice: payload[itemKey].productPrice,
          productImages: [
            {
              image1: payload[itemKey].productImages.image1,
              image2: payload[itemKey].productImages.image2,
              image3: payload[itemKey].productImages.image3,
            },
          ],
        });
      }

      state.productData = loadedProduct;
    },

    [fetchProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = "Error fetching product data";
    },
  },
});
export const productActions = productSlice.actions;
export default productSlice;
