import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { getCartQuantity } = useCart();
  const totalProductos = getCartQuantity();

  const getNavClass = ({isActive}) => `flex items-center px-4 md:text-lg ${isActive ? 'text-blue-500 font-extrabold' : 'text-gray-400'}`
  
  return (
    <header className="bg-black/70 pt-4 rounded-b-2xl">
      <div className="flex justify-center items-center font-extrabold text-blue-500 text-2xl md:text-4xl gap-3">
        <Link to='/'><img className="h-12 w-auto md:h-18" src="/images/logo_corp.png" alt="Logo_corp._capsula" /></Link>
        <p>TechStore</p>
      </div>

      <nav className="flex flex-wrap justify-center md:justify-around gap-x-4 gap-y-2 p-4 tracking-widest text-xs">
        <NavLink to='/' className={getNavClass}>Inicio</NavLink>
        <NavLink to='/productos' className={getNavClass}>Productos</NavLink>
        <NavLink to='/ofertas' className={getNavClass}>Ofertas</NavLink>
        <NavLink to='/contactos' className={getNavClass}>Contactos</NavLink>
        <NavLink to='/carrito' className="flex items-center text-base md:text-xl gap-1 relative"><FaShoppingCart className="text-gray-400"/>
        <span className={`flex items-center justify-center text-center w-4 h-4 md:w-5 md:h-5 p-2 rounded-full text-white text-xs md:text-base absolute -top-1 -right-4 ${totalProductos > 0 ? "bg-green-500" : "bg-red-500" } `}>
          {totalProductos}
        </span></NavLink>
      </nav>
    </header>    
  )
}

export default Header;