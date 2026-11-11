import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ProductDetail from "./ProductDetail";

const ProductDetailContainer = () => {
  const { id } = useParams();
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const resultado = await getDoc(doc(db, "productos", id));
        if (resultado.exists()) {
          setDetailsProduct({ ...resultado.data(), id: resultado.id });
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id]);

  if (cargando) {
    return <p className="text-white text-center p-6">Cargando...</p>;
  }

  if (!detailsProduct) {
    return <p className="text-white text-center p-6">Producto no encontrado.</p>;
  }

  return <ProductDetail {...detailsProduct} />;
};

export default ProductDetailContainer;