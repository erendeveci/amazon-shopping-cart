import { useState, useEffect } from "react";
import classes from "./ShopItem.module.css";
import AddButton from "../UI/AddButton";
import Slider from "../UI/Slider";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/productSlice";
import { cartActions } from "../store/cartSlice";
const ShopItem = ({ product }) => {
  const dispatch = useDispatch();
  //  console.log(product)
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className={classes.itemContainer}>
      <Slider
        image1={product.productImages[0].image1}
        image2={product.productImages[0].image2}
        image3={product.productImages[0].image3}
      />

      <p className={classes.itemTitle}>{product.productTitle}</p>

      <p className={classes.itemPrice}>{(product.productPrice).toFixed(2)} ₺ </p>

      <div className={classes.addButton}>
        <button onClick={addToCartHandler} className={classes.addToCartBtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ShopItem;
