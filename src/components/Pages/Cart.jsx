import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const { cart, clearCart, getCartTotal, incrementarCantidad, decrementarCantidad, eliminarDelCarrito } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Mi Carrito</h2>
        <p className="text-gray-400 mb-6">Todavía no agregaste productos al carrito.</p>
        <Link to="/productos" className="bg-blue-500 text-white px-4 py-1 rounded font-bold">Ver Productos</Link>
      </div>
    );
  }

  return (
    <div className="text-center p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Mi Carrito</h2>

      <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
        {cart.map((item) => (
          <div
            key={item.id}
            className="w-28 flex flex-col items-center text-center gap-2 bg-slate-800 rounded-lg p-3 sm:w-full sm:flex-row sm:justify-between sm:text-left relative">
            <Link to={`/productos/${item.id}`}>
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-16 h-16 object-contain rounded"
              title="Ver Detalles"
            />
            </Link>
            <div className="flex gap-2 sm:flex-1 text-xs">
              <h3 className="font-bold text-white">{item.nombre}</h3>
             <button onClick={() => eliminarDelCarrito(item.id)} className="text-sm absolute top-1 right-1 sm:static sm:top-auto sm:right-auto" title="Eliminar">
              <RiDeleteBin5Line className="text-red-600 font-bold cursor-pointer"/>
            </button>
            </div>
            <p className="text-sky-400 text-xs font-bold px-4">
              ${(item.precio * item.quantity).toLocaleString("es-AR")}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <button onClick={() => decrementarCantidad(item.id)}><FaMinus className="text-sky-400 cursor-pointer" title="Menos"/></button>
              <span className="text-white font-bold">{item.quantity}</span>
              <button onClick={() => incrementarCantidad(item.id)}><FaPlus className="text-sky-400 cursor-pointer" title="Mas"/></button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 md:justify-between mt-6 ">
        <p className="text-base md:text-xl font-bold text-white">
          Total: ${getCartTotal().toLocaleString("es-AR")}
        </p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-2 py-1 rounded font-bold cursor-pointer"
        >
          Vaciar carrito
        </button>
      </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            onClick={() => {
              alert("Gracias por su compra");
              clearCart();
            }}
            className="bg-blue-500 text-white px-4 py-1 rounded font-bold"
          >
            Finalizar Compra
          </Link>
        </div>
    </div>
  );
};

export default Cart;