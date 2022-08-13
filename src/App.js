import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { addItemToDatabase, removeAllCartData } from "./store/cartSlice";

import { fetchProduct } from "./store/productSlice";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "./store/cartSlice";
let isInitial = true;
function App() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  /* useEffect(() => {
    if (cart.totalQuantity === 0) {
      dispatch(removeAllCartData());
    }
  }, [cart.items]);
*/

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.totalQuantity === 0) {
        dispatch(removeAllCartData());
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [cart.items]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(addItemToDatabase(cart));
    }
  }, [cart.items]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
