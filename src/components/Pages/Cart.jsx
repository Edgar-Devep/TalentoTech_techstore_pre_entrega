import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Mi Carrito</h2>
        <p className="text-gray-400">Todavía no agregaste productos al carrito.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Mi Carrito</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 bg-slate-800 rounded-lg p-4"
          >
            <Link to={`/productos/${item.id}`}>
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-16 h-16 object-contain rounded"
            />
            </Link>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-white">{item.nombre}</h3>
              <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
            </div>
            <p className="text-sky-400 font-bold">
              ${(item.precio * item.quantity).toLocaleString("es-AR")}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-xl font-bold text-white">
          Total: ${getCartTotal().toLocaleString("es-AR")}
        </p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded font-bold"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;