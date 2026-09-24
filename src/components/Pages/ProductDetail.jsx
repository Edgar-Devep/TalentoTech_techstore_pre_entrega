const ProductDetail = ({ nombre, imagen, precio, stock, enOferta} ) => {

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <img
        src={imagen}
        alt={nombre}
        className="w-64 h-64 object-contain rounded mb-4"
      />
      <h2 className="text-2xl font-bold text-white">{nombre}</h2>
      <p className="text-sky-400 text-xl font-bold">${precio}</p>
      {enOferta && (
        <p className="text-red-600 text-xl font-bold">Oferta</p>
      )}
      <p className="text-gray-400">Stock: {stock}</p>
    </div>
  );
};

export default ProductDetail;
