import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-white text-center p-6">Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;