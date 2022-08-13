import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux/";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className={classes.navbar}>
      <Link to="/">
        <img
          className={classes.imgLogo}
          alt="logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <Link to="cart">
        <div className={classes.containerShoppingCart}>
          <img
            alt="cart"
            className={classes.imgShoppingCart}
            src="https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg"
          />
          <p>{quantity}</p>
          <h5>Cart</h5>
        </div>
      </Link>
    </div>
  );
};
export default Navbar;
