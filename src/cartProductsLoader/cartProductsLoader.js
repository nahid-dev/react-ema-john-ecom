import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
  console.log(ids);
  const loadedProducts = await fetch("http://localhost:5000/productsById", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProducts.json();

  const saveCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find((pd) => pd._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      saveCart.push(addedProduct);
    }
  }
  console.log(saveCart);
  return saveCart;
};

export default cartProductsLoader;
