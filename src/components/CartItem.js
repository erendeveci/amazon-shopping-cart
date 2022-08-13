import classes from "./CartItem.module.css";
import { useSelector } from "react-redux";

import { FaBeer } from "react-icons/fa";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

import { cartActions } from "../store/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const btnIncreaseHandler = (itemId) => {
    dispatch(cartActions.increase(itemId));
  };
  const btnDecreaseHandler = (itemId) => {
    dispatch(cartActions.decrease(itemId));
  };
  return (
    <div className={classes.itemContainer}>
      {cartItems.map((item, index) => (
        <div key={index}>
          <div className={classes.content}>
            <img src={item.productImage} />

            <div className={classes.detail}>
              <h4>{item.productTitle}</h4>
              <p>Price: {item.productPrice} ₺</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className={classes.price}>
              <h4>{item.totalPrice.toFixed(3)} ₺</h4>
              <button
                onClick={() => btnIncreaseHandler(item.productId)}
                className={classes.increase}
              >
                <BsFillArrowUpCircleFill />
              </button>
              {item.quantity === 1 ? (
                <div className={classes.amount} style={{ color: "red" }}>
                  Remove
                </div>
              ) : (
                <div className={classes.amount}>{item.quantity}</div>
              )}

              <button
                onClick={() => btnDecreaseHandler(item.productId)}
                className={classes.decrease}
              >
                <BsFillArrowDownCircleFill />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartItem;
