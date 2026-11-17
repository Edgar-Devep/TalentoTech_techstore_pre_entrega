import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completá el correo y la contraseña.");
      return;
    }

    try {
      setCargando(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/panel");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

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

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoComplete="current-password"
          className="inputLogin"
        />

        {error && <p className="text-red-400 text-sm md:text-base">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-500 text-white px-4 py-3 text-base md:text-lg rounded-lg font-bold disabled:opacity-50 cursor-pointer"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;