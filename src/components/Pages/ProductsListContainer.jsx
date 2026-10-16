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
        setProductos(datos);

      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        console.log("Termino el Proceso");
      }
    };
    cargarProductos();
  }, []);
  
  const productosVisibles = soloOfertas
    ? productos.filter((producto) => producto.enOferta === true)
    : productos;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {productosVisibles.map((producto) => (
        <Products key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default ProductsListContainer;
