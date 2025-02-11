import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const API_URL = "https://online-pharmacy-jwkq.onrender.com/cart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`${API_URL}/${userId}`)
        .then(response => setCartItems(response.data.cartItems))
        .catch(error => console.error("Error fetching cart data:", error));
    }
  }, [userId]);

  const saveCartToServer = (updatedCart) => {
    if (!userId) return;
    axios.post(`${API_URL}/${userId}`, { cartItems: updatedCart })
      .catch(error => console.error("Error saving cart data:", error));
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCart);
    saveCartToServer(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    saveCartToServer(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    saveCartToServer(updatedCart);
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToServer([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        address,
        addToCart,
        updateQuantity,
        removeFromCart,
        updateAddress,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
