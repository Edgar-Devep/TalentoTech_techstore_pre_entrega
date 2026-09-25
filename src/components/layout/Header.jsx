import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const getNavClass = ({isActive}) => `px-4 md:text-lg ${isActive ? 'text-blue-500 font-extrabold' : 'text-gray-400'}`
  const getNavClassCar = ({isActive}) => `flex items-center rounded-full p-0.5 md:p-1 ${isActive ? 'bg-blue-500 ' : 'bg-gray-400'}`
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
        <NavLink to='/carrito' className= {getNavClassCar}>🛒</NavLink>
      </nav>
    </header>    
  )
}

export default Header;