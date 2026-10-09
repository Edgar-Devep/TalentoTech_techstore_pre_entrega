import { useCart } from "../context/useCart";

const ProductDetail = ({ id, nombre, imagen, precio, stock, enOferta }) => {
  const { addToCart } = useCart();

  const handleAgregar = (e) => {
    e.preventDefault();
    addToCart({ id, nombre, precio, imagen }, 1);
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-3xs mx-auto m-8 p-4 bg-slate-800 rounded-lg gap-2">
      {enOferta && <p className="text-red-600 text-xl font-bold">Oferta</p>}
      <img
        src={imagen}
        alt={nombre}
        className="w-64 h-64 object-contain rounded"
      />
      <h2 className="text-2xl font-bold text-white">{nombre}</h2>
      <p className="text-sky-400 text-xl font-bold">${precio}</p>
      <p className="text-gray-400">Stock: {stock}</p>
      <button
        onClick={handleAgregar}
        className="bg-blue-500 text-white px-4 py-1 rounded font-bold"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductDetail;
