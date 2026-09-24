const Home = () => {
  return (
    <div className="flex flex-col text-center justify-center items-center p-6 md:p-10 max-w-3xl mx-auto">
      <div className="flex justify-center items-center gap-5 mb-4">
        <img
          className="h-12 w-auto md:h-18"
          src="/images/logo_corp.png"
          alt="Logo_corp._capsula"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-sky-400">
          Nuestra Historia
        </h2>
      </div>

      <p className="text-gray-300 mb-4 leading-relaxed">
        Todo comenzó en 2016, en un pequeño laboratorio de ideas, con un
        objetivo ambicioso: crear la cápsula perfecta de tecnología para cada
        persona. Como toda gran invención, empezamos compactos... pero con el
        poder de transformarnos en algo mucho más grande.
      </p>

      <p className="text-gray-300 mb-4 leading-relaxed">
        Con los años, fuimos evolucionando —como quien entrena para alcanzar su
        forma más poderosa— hasta convertirnos en la corporación tecnológica que
        somos hoy.
      </p>

      <p className="text-gray-300 mb-4 leading-relaxed">
        Hoy en día, cada producto que sale de nuestro catálogo lleva esa misma
        esencia: potencia, innovación y calidad, listos para "activarse" en tus
        manos.
      </p>

      <p className="text-sky-400 font-bold mt-6">
        De un pequeño laboratorio a una potencia tecnológica — esa es nuestra
        historia.
      </p>
    </div>
  );
};

export default Home;
