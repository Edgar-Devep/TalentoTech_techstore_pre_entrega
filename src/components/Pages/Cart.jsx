import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/useCart";

const Cart = () => {
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [segundos, setSegundos] = useState(5);
  const { cart, clearCart, getCartTotal, incrementarCantidad, decrementarCantidad, eliminarDelCarrito } = useCart();
  const navigate = useNavigate();


useEffect(() => {
  if (!compraFinalizada) return;

  const intervalo = setInterval(() => {
    setSegundos((seg) => seg - 1);
  }, 1000);

  return () => clearInterval(intervalo);
}, [compraFinalizada]);

useEffect(() => {
  if (segundos === 0) navigate("/productos");
}, [segundos, navigate]);

  const handleFinalizar = () => {
    clearCart();
    setCompraFinalizada(true);
  };

  if (compraFinalizada) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h2 className="text-3xl font-bold text-white">
          ¡Gracias por tu compra! 😁
        </h2>
        <p className="text-gray-300">Te llevamos al inicio en unos segundos en ... <span className="text-lg text-red-600">{segundos}</span></p>
        <Link
          to="/productos"
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
        >
          Volver ahora
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Mi Carrito</h2>
        <p className="text-gray-400 mb-6">
          Todavía no agregaste productos al carrito.
        </p>
        <Link
          to="/productos"
          className="bg-blue-500 text-white px-4 py-1 rounded font-bold"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className="text-white mx-9 mt-9">
        ← Atras
      </button>
      <div className="text-center p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Mi Carrito
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
          {cart.map((item) => (
            <div
              key={item.id}
              className="w-28 flex flex-col items-center text-center gap-2 bg-slate-800 rounded-lg p-3 sm:w-full sm:flex-row sm:justify-between sm:text-left relative"
            >
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
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-sm absolute top-1 right-1 sm:static sm:top-auto sm:right-auto"
                  title="Eliminar"
                >
                  <RiDeleteBin5Line className="text-red-600 font-bold cursor-pointer" />
                </button>
              </div>
              <p className="text-sky-400 text-xs font-bold px-4">
                ${(item.precio * item.quantity).toLocaleString("es-AR")}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <button onClick={() => decrementarCantidad(item.id)}>
                  <FaMinus
                    className="text-sky-400 cursor-pointer"
                    title="Menos"
                  />
                </button>
                <span className="text-white font-bold">{item.quantity}</span>
                <button onClick={() => incrementarCantidad(item.id)}>
                  <FaPlus className="text-sky-400 cursor-pointer" title="Mas" />
                </button>
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
          <button
            onClick={handleFinalizar}
            className="bg-blue-500 text-white px-4 py-1 rounded font-bold cursor-pointer"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
