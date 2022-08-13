import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (total, value) => (total = total + value.totalPrice),
    0
  );

  return (
    <>
      <section className={classes.cartContainer}>
        <div className={classes.title}>
          <h3>Shopping Cart</h3>
          <hr />
          {items.length === 0 ? <p>Add something</p> : ""}
          <CartItem />
        </div>
      </section>

      <section className={classes.total}>
        <div className={classes.totalText}>
          <h4>Total : {total.toFixed(2)} ₺</h4>
        </div>
        <hr />
      </section>
    </>
  );
};

export default Cart;
