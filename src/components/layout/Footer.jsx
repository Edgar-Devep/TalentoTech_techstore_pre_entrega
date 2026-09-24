import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center bg-black/70 p-4 rounded-t-lg border-none">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="break-all">
          <h4 className="font-bold mb-2 text-sm text-blue-500">Contacto</h4>
          <p className="p-informacion">contacto@techstore.com</p>
          <p className="p-informacion">+54 11 5555-5555</p>
          <p className="p-informacion">Lun a Vie 9:00 - 18:00hs</p>
        </div>
        <div className="break-all">
          <h4 className="font-bold mb-2 text-sm text-blue-500">Seguinos</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter/X
              </a>
            </li>
          </ul>
        </div>
        <div className="break-all">
          <h4 className="font-bold mb-2 text-sm text-blue-500">Links rápidos</h4>
          <ul className="text-xs text-gray-400 ">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/ofertas">Ofertas</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-sm text-blue-500">Medios de pago</h4>
          <p className="text-xs text-gray-400">
            Visa, Mastercard, Mercado Pago, Transferencia
          </p>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-xs text-gray-400">Copyright: © 2026 TechStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
