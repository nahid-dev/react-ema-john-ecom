import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Cart = ({ cart, handleClearCart }) => {
  const handleCheckOut = () => {};
  // console.log(cart);
  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = (totalPrice * 10) / 100;
  const grandTotal = totalPrice + totalShipping + tax;
  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>

      <button onClick={handleClearCart} className="btn-clear-cart">
        <span>Clear Cart</span>
        <FontAwesomeIcon className="delete-icon" icon={faTrashCan} />
      </button>
      <Link to="/checkOut" className="checkout-link">
        <button className="checkout-btn">
          <span>Proceed Checkout</span>
          <FontAwesomeIcon className="checkout-icon" icon={faCreditCard} />
        </button>
      </Link>
    </div>
  );
};

export default Cart;
