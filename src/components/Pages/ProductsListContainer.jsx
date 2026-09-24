import { useState, useEffect } from "react";
import Products from "./Products";

const ProductsListContainer = ({ soloOfertas = false }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuestaProductos = await fetch("/data/productos.json");
        if (!respuestaProductos.ok) {
          throw new Error("No llegó la respuesta de los productos");
        }
        const datos = await respuestaProductos.json();

        const productosFiltrados = soloOfertas
          ? datos.filter((producto) => producto.enOferta === true)
          : datos;

        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        console.log("Termino el Proceso");
      }
    };
    cargarProductos();
  }, [soloOfertas]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {productos.map((producto) => (
        <Products key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default ProductsListContainer;
