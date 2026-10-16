import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  // Eliminamos el producto
  const eliminarDelCarrito = (id) => {
    setCart(carritoPrevio => carritoPrevio.filter(item => item.id !== id));
  };

  // Incrementar cantidad en 1
  const incrementarCantidad = (id) => {
    setCart(carritoPrevio =>
      carritoPrevio.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementar cantidad en 1 (Si llega a 0, se elimina)
  const decrementarCantidad = (id) => {
    setCart(carritoPrevio =>
      carritoPrevio
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal, eliminarDelCarrito, incrementarCantidad,decrementarCantidad }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
