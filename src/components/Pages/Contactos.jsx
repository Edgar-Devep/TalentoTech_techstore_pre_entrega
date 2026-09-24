const Contactos = () => {
  return (
    <div className="min-h-[70vh] flex flex-col text-center justify-center items-center space-y-4 py-4">
      <div className="break-all">
        <h4 className="font-bold mb-2 text-lg md:text-3xl text-blue-500">Contacto</h4>
        <p className="p-informacion-ruta">contacto@techstore.com</p>
        <p className="p-informacion-ruta">+54 11 5555-5555</p>
        <p className="p-informacion-ruta">Lun a Vie 9:00 - 18:00hs</p>
      </div>
      <div className="break-all">
        <h4 className="font-bold mb-2 text-lg md:text-3xl text-blue-500">Seguinos</h4>
        <ul className="md:text-xl text-gray-400 space-y-1">
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
    </div>
  );
};

export default Contactos;
