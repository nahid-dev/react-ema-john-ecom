import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Header = () => {
  const { user, logOUt } = useContext(AuthContext);
  // console.log(user);

  const handleLogOut = () => {
    logOUt()
      .then(() => {})
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />

      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
        {user && (
          <>
            <span className="text-white">{user.email}</span>
            <button onClick={handleLogOut} className="btn-outline">
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
