import React, { useContext, useState } from "react";
import "./singUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);
    setError("");
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("password must be 6 charecters");
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        toast.success("Sign Up Successful");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-control">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              id=""
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              id=""
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              id=""
              required
            />
          </div>
          <input type="submit" className="btn-submit" value="Sign Up" />
        </form>
        <p>
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </p>
        <p className="text-error">{error}</p>
      </div>
    </div>
  );
};

export default SignUp;
