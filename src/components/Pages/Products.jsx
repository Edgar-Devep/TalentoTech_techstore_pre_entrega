import { Link } from "react-router-dom";

const Products = ({ id, nombre, imagen }) => {
 
  return (
    <div className="flex flex-col gap-4 w-full bg-slate-800 rounded-lg p-6 text-center">
      <Link to={`/productos/${id}`}>
        <div className="w-full h-20 md:h-40 lg:h-48 rounded flex items-center justify-center overflow-hidden">
          <img
            src={imagen}
            alt={nombre}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="p-2">
          <h3 className="font-bold text-white">{nombre}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Products;
