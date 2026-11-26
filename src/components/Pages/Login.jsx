import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();
  const { user, login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completá el correo y la contraseña.");
      return;
    }

    try {
      setCargando(true);
      await login(email.trim(), password);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 bg-slate-800 rounded-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Iniciar sesión
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          autoComplete="email"
          className="inputLogin"
        />

        <div className="relative">
          <input
            type={verPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
            className="inputLogin pr-12"
          />
          <button
            type="button"
            onClick={() => setVerPassword(!verPassword)}
            aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
          >
            {verPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm md:text-base">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-500 text-white px-4 py-3 text-base md:text-lg rounded-lg font-bold disabled:opacity-50 cursor-pointer"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
        <p className="text-gray-300 text-center text-sm">
          ¿No tenés cuenta? <Link to="/registro" className="text-blue-400">Registrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;