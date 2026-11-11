import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const ProductDetail = ({ id, nombre, imagen, precio, stock, enOferta }) => {
  const { addToCart } = useCart();
  const navegate = useNavigate();

  const handleAgregar = (e) => {
    e.preventDefault();
    addToCart({ id, nombre, precio, imagen }, 1);
    navegate(-1)
  };
  return (
  <>
    <div className="md:flex md:flex-row justify-center items-center ">
      <div className="px-9 pt-9">
        <Link to="/productos"className="text-white">
            ← Volver a productos
        </Link>
        <div className="flex flex-col max-w-md md:max-w-lg lg:max-w-xl items-center justify-center text-center mx-auto m-8 p-8  bg-blue-500/50 hover:bg-blue-500 rounded-lg gap-2">
          {enOferta && <p className="text-red-600 text-xl font-bold pb-4">Oferta</p>}
          <img
            src={imagen}
            alt={nombre}
            className="w-full h-auto object-contain rounded md:hover:scale-[1.03] transition duration-300"
            />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center pb-6 gap-3">
        <h2 className="text-2xl font-bold text-white ">{nombre}</h2>
        <p className="text-sky-400 text-xl font-bold">${precio}</p>
        <p className="text-gray-400">Stock: {stock}</p>
        <button
          onClick={handleAgregar}
          className="bg-blue-500 text-white px-4 py-1 rounded font-bold cursor-pointer"
          >
          Agregar
        </button>
      </div>
    </div>
  </>
  );
};

export default ProductDetail;
