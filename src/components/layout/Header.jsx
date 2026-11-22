import { useEffect, useRef } from "react";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { useSearch } from "../context/useSearch";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { RiLogoutCircleLine, RiLoginCircleLine } from "react-icons/ri";

// preguntar lo de firebase 
// lo de la protecttion
// q se boore lo de carrito 
// preguntar lo de suir las imagenes



const Header = () => {
  const { busqueda, setBusqueda } = useSearch();
  const { getCartQuantity } = useCart();
  const totalProductos = getCartQuantity();
  const { pathname } = useLocation();

  const getNavClass = ({ isActive }) => `getNav ${isActive ? "text-blue-500 font-bold" : "text-gray-400"}`;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const estaEnListado = pathname === "/productos" || pathname === "/ofertas";
  const disableSearch = pathname === "/carrito" || pathname === "/panel";

  const navegandoPorBusqueda = useRef(false);

  const handleChange = (e) => {
  setBusqueda(e.target.value);
  if (!estaEnListado) {
    navegandoPorBusqueda.current = true;
    navigate("/productos");
    }
  };

  useEffect(() => {
    if (navegandoPorBusqueda.current) {
      navegandoPorBusqueda.current = false;
      return;
    }
    setBusqueda("");
  }, [pathname]);

  const limpiarBusqueda = () => setBusqueda("");

  return (
    <header className="sticky top-0 z-50 bg-blue-900 pt-4 rounded-b-2xl">
      <div className="flex justify-center items-center gap-3 font-extrabold text-blue-500 text-2xl md:text-4xl">
        <Link to="/">
          <img
            className="h-12 w-auto md:h-18"
            src="/images/logo_corp.png"
            alt="Logo_corp._capsula"
          />
        </Link>
        <p>TechStore</p>
      </div>

      <nav className="flex flex-wrap justify-center md:justify-around gap-x-4 gap-y-2 px-4 py-6 tracking-widest text-xs">
        
        <NavLink to="/" className={getNavClass}> Inicio </NavLink>
        <NavLink to="/productos" className={getNavClass}> Productos </NavLink>
        <NavLink to="/ofertas" className={getNavClass}> Ofertas </NavLink>
        <NavLink to="/contactos" className={getNavClass}> Contactos </NavLink>
        <NavLink to="/carrito" className={(data) => `${getNavClass(data)} relative`}> <FaShoppingCart />
          <span className={`contadorCarrito ${totalProductos > 0 ? "bg-green-500" : "bg-red-500"}`}>
            {totalProductos}
          </span>
        </NavLink>
        
        {user?.rol === "admin" && (
          <NavLink to="/panel" className={getNavClass}>
            <GrUserAdmin />
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex items-center px-3 py-1 md:text-xl bg-red-500/50 rounded-xl text-white hover:text-red-500 font-extrabold cursor-pointer"
          >
            <RiLogoutCircleLine/>
          </button>
        ) : 
        <Link
            to="/login"
            title="Iniciar Sesion"
            aria-label="Iniciar Sesion"
            className="flex items-center px-3 py-1 md:text-xl bg-green-500/50 rounded-xl text-white hover:text-green-500 font-extrabold cursor-pointer"
          >
            <RiLoginCircleLine/>
          </Link>
        }
      </nav>
      {!disableSearch &&
        <div className="flex justify-end px-4 md:px-8 pb-6">
          <div className="relative w-full sm:w-64 md:w-80">
            <input
              type="text"
              value={busqueda}
              onChange={handleChange}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              className="w-full pl-4 pr-9 py-2 text-sm md:text-base font-normal rounded-full bg-blue-950/60 text-white placeholder-gray-400 border border-transparent focus:border-blue-400 focus:outline-none transition"
            />
            {busqueda && (
              <button
                type="button"
                onClick={limpiarBusqueda}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      }
    </header>
  );
};

export default Header;
