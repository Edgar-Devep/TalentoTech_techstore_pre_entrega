import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Products from "./Products";

const ProductsListContainer = ({ soloOfertas = false }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const resultado = await getDocs(collection(db, "productos"));
        console.log(resultado);
        
        const datos = resultado.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(datos);

        const productosFiltrados = soloOfertas
          ? datos.filter((producto) => producto.enOferta === true)
          : datos;

        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false)
      }
    };
    cargarProductos();
  }, [soloOfertas]);

  if (cargando) {
    return <p className="text-white text-center p-6">Cargando...</p>;
  }

    if (productos.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{soloOfertas ? "Ofertas" : "Productos" }</h2>
        <p className="text-gray-400 mb-6">{soloOfertas ? "No hay ofertas por ahora." : "Todavía no hay productos disponibles."}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {productos.map((producto) => (
        <Products key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default ProductsListContainer;