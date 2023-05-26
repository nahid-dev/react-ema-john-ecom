import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { toast } from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Log in done");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin}>
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
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              id=""
              required
            />
            <p style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
              <small>
                {show ? <span>Hide Password</span> : <span>Show Password</span>}
              </small>
            </p>
          </div>
          <input type="submit" className="btn-submit" value="Login" />
        </form>
        <p>
          <small>
            New to Ema-john? <Link to="/signUp">Sign Up</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
