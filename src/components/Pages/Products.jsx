import { Link } from "react-router-dom";

const Products = ({ id, nombre, imagen }) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-blue-500/50 hover:bg-blue-500 transition duration-300 rounded-lg p-6 text-center group">
      <Link to={`/productos/${id}`}>
        <div className="w-full aspect-square flex items-center justify-center">
          <img
            src={imagen}
            alt={nombre}
            className="max-w-full max-h-full object-contain md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-[1.03] transition duration-300"
          />
        </div>
        <div className="p-2 flex justify-center">
          <h3 className="font-bold text-white">{nombre}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Products;
