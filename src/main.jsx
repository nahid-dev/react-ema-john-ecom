import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from "./component/Shop/Shop";
import Home from "./component/Layout/Home";
import Orders from "./component/Orders/Orders";
import Inventory from "./component/Inventory/Inventory";
import Login from "./component/Login/Login";
import cartProductsLoader from "./cartProductsLoader/cartProductsLoader";
import { Toaster } from "react-hot-toast";
import SignUp from "./component/SignUp/SignUp";
import AuthProviders from "./component/providers/AuthProviders";
import CheckOut from "./component/CheckOut/CheckOut";
import PrivetRoutes from "./component/routes/PrivetRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: cartProductsLoader,
      },
      {
        path: "inventory",
        element: (
          <PrivetRoutes>
            <Inventory></Inventory>
          </PrivetRoutes>
        ),
      },
      {
        path: "/checkOUt",
        element: (
          <PrivetRoutes>
            <CheckOut></CheckOut>
          </PrivetRoutes>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProviders>
  </React.StrictMode>
);
