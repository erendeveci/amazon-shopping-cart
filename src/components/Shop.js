import classes from "./Shop.module.css";
import ShopItem from "./ShopItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../store/productSlice";
const Shop = () => {
  const selectProducts = useSelector((state) => state.product.productData);

  return (
    <div className={classes.shopContainer}>
      <div className={classes.shopItemContainer}>
        {selectProducts.map((product, index) => (
          <ShopItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Shop;
