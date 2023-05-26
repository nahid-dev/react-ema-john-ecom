import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [cart, setCart] = useState([]);

  const { totalProducts } = useLoaderData();
  const totalPage = Math.ceil(totalProducts / itemsPerPage);

  const pageNumbers = [...Array(totalPage).keys()];

  /*
   *TODO: Decide on the number of items per page:
   *
   */

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsById", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const saveCart = [];

        // step 01: get id>
        for (const id in storedCart) {
          // step 02: get the product by using id>
          const addedProduct = cartProducts.find(
            (product) => product.id === id
          );
          // step 3: get quantity of the product
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
          }
        }
        setCart(saveCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
    toast.success("product added");
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }
  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}></Cart>
        </div>
      </div>

      {/* Pagination area */}
      <div className="pagination">
        <p>Current Page: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            className={currentPage === number ? "selected" : ""}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        <select
          name=""
          value={itemsPerPage}
          onChange={handleSelectChange}
          id=""
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}{" "}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
import "./Shop.css";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
export default Shop;
