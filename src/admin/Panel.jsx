import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import ProductForm from "./ProductForm";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

const Panel = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const cargarProductos = async () => {
    try {
      const resultado = await getDocs(collection(db, "productos"));
      const datos = resultado.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      }));
      setProductos(datos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const confirmarEliminar = async () => {
    try {
      await deleteDoc(doc(db, "productos", productoAEliminar.id));
      setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto.");
    } finally {
      setProductoAEliminar(null);
    }
  };

  const openModal = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const closedModal = () => {
    setProductoAEditar(null);
    setModalAbierto(false);
  };

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  return (
    <>
      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closedModal}
        >
          <div
            className="w-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductForm
              onClosed={closedModal}
              onGuardado={cargarProductos}
              title={productoAEditar ? "Editar" : "Agregar Producto"}
              productoAEditar={productoAEditar}
            />
          </div>
        </div>
      )}
      
      {productoAEliminar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setProductoAEliminar(null)}
        >
          <div
            className="w-full max-w-sm bg-slate-800 rounded-lg p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              ¿Eliminar producto?
            </h3>
            <p className="text-gray-400 mb-4">
              Vas a eliminar "{productoAEliminar.nombre}". Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setProductoAEliminar(null)}
                className="bg-slate-600 text-white px-4 py-2 rounded font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="bg-red-500 text-white px-4 py-2 rounded font-bold cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Panel Administrativo
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="w-28 flex flex-col items-center text-center gap-2 bg-slate-800 rounded-lg p-3 sm:w-full sm:flex-row sm:justify-between sm:text-left relative"
            >
              <Link to={`/productos/${prod.id}`}>
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="w-16 h-16 object-contain rounded"
                  title="Ver Detalles"
                />
              </Link>
              <div className="flex gap-2 sm:flex-1 text-xs">
                <h3 className="font-bold text-white">{prod.nombre}</h3>
              </div>
              <p className="text-sky-400 text-xs font-bold px-4">
                ${prod.precio.toLocaleString("es-AR")}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => abrirModalEditar(prod)}
                  className="text-white bg-blue-600 p-2 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => setProductoAEliminar(prod)}
                  className="text-base absolute top-1 right-1 sm:static sm:top-auto sm:right-auto"
                  title="Eliminar"
                >
                  <RiDeleteBin5Line className="text-red-600 font-bold cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 mt-6 rounded font-bold cursor-pointer"
          >
            Agregar Producto
          </button>
        </div>
      </div>
    </>
  );
};

export default Panel;
