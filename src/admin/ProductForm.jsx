import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import { FaTimes } from "react-icons/fa";

const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  imagen: "",
  enOferta: false,
};

const ProductForm = ({ onClosed, title, productoAEditar, onGuardado }) => {
  const [producto, setProducto] = useState(productoAEditar || estadoInicial);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExito("");

    if (!producto.nombre.trim() || !producto.imagen.trim()) {
      setError("El nombre y la imagen son obligatorios.");
      return;
    }
    if (Number(producto.precio) <= 0) {
      setError("El precio tiene que ser mayor a 0.");
      return;
    }
    if (Number(producto.stock) < 0 || producto.stock === "") {
      setError("El stock no puede estar vacío ni ser negativo.");
      return;
    }

    const { id, ...datos } = producto;
    const datosAEnviar = {
      ...datos,
      nombre: datos.nombre.trim(),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
    };

    try {
      setGuardando(true);

      if (productoAEditar) {
        await updateDoc(doc(db, "productos", productoAEditar.id), datosAEnviar);
        setExito("Producto actualizado correctamente.");
      } else {
        await addDoc(collection(db, "productos"), datosAEnviar);
        setProducto(estadoInicial);
        setExito("Producto guardado correctamente.");
      }
      await onGuardado();
      setError("");
      onClosed();
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError("No se pudo guardar el producto. Probá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto my-8 p-6 bg-slate-800 rounded-lg"
    >
      <button
        onClick={onClosed}
        type="button"
        title="Cerrar"
        className="self-end cursor-pointer text-white"
      >
        <FaTimes />
      </button>
      <h2 className="text-2xl font-bold text-white text-center">{title}</h2>

      <input
        type="text"
        name="nombre"
        value={producto.nombre}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="inputClase"
      />

      <input
        type="number"
        name="precio"
        value={producto.precio}
        onChange={handleChange}
        placeholder="Precio"
        min="0"
        className="inputClase"
      />

      <input
        type="number"
        name="stock"
        value={producto.stock}
        onChange={handleChange}
        placeholder="Stock"
        min="0"
        className="inputClase"
      />

      <input
        type="text"
        name="imagen"
        value={producto.imagen}
        onChange={handleChange}
        placeholder="URL de la imagen (ej: /images/mouse.jpg)"
        className="inputClase"
      />

      {producto.imagen && (
        <img
          src={producto.imagen}
          alt="Vista previa"
          className="w-32 h-32 object-contain mx-auto rounded"
        />
      )}

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          name="enOferta"
          checked={producto.enOferta}
          onChange={handleChange}
        />
        En oferta
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {exito && <p className="text-green-400 text-sm">{exito}</p>}

      <button
        type="submit"
        disabled={guardando}
        className="bg-blue-500 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
      >
        {guardando ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
};

export default ProductForm;
