import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";

const ProductDetailContainer = () => {
  const { id } = useParams();
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) {
          throw new Error("No llegó la respuesta de los productos");
        }
        const data = await respuesta.json();
        const encontrado = data.find((pro) => pro.id === parseInt(id));
        setDetailsProduct(encontrado);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, [id]);

  if (cargando) {
    return <p className="text-white text-center p-6">Cargando...</p>;
  }

  if (!detailsProduct) {
    return (
      <p className="text-white text-center p-6">Producto no encontrado.</p>
    );
  }

  return <ProductDetail {...detailsProduct} />;
};

export default ProductDetailContainer;
